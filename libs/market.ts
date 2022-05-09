import { ethers, utils } from 'ethers';
import { nextItemContract, nextMarketContract } from './contracts';
import { convertImageUrl, convertMetadataUrl } from './utils/utils';

async function getItemMetadata(items: any[], signer: any) {
  const itemContract = new ethers.Contract(nextItemContract.address, nextItemContract.abi, signer);
  const dataItems = await Promise.all(
    items.map((data: any) => new Promise(async (resolve, reject) => {
      try {
        const jsonUri = await itemContract.uri(data.tokenId);
        const jsonData = await utils.fetchJson(convertMetadataUrl(jsonUri));
        resolve({
          ...data,
          ...jsonData,
          image: convertImageUrl(jsonData.image),
          name: jsonData.image.split('/').pop().split('.')[0],
          category: jsonData.properties.Category
        });
      } catch (error) {
        resolve({...data});
      }
    }))
  );
  return dataItems;
}

export const getUserOwnedItems = async function(signer: any, accountAddress: string) {
  const shopContract = new ethers.Contract(nextItemContract.address, nextItemContract.abi, signer);
  const rawItems = await shopContract.assetsOf(accountAddress);
  let assetsMapping = []
  for (let i = 0; i < rawItems[0].length; ++i) {
    let asset = {
      tokenId: rawItems[0][i].toString(),
      quantity: rawItems[1][i].toString(),
    }
    assetsMapping.push(asset)
  }
  return getItemMetadata(assetsMapping, signer);
};

export const approveToSellNFT = async function(signer: any, nftAddress: any, amount: any) {
  const fromAddress = await signer.getAddress()
  console.log('approve ', {fromAddress, nftAddress, amount})
  if (!nftAddress) {
    console.error('nftAddress not found', nftAddress)
    return false
  }
  try {
    // make NextMarket to hold all user's nfts
    const contract = new ethers.Contract(nextItemContract.address, nextItemContract.abi, signer);
    const approveWait = await contract.setApprovalForAll(nextMarketContract.address, true)
    const approveResult = await approveWait.wait();
    console.log('approveResult', approveResult);
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export const checkMarketApprovedToSellNFT = async function(signer: any) {
  const userAddress = await signer.getAddress()
  if (!userAddress) {
    console.error('userAddress not found', userAddress)
    return false
  }
  try {
    const contract = new ethers.Contract(nextItemContract.address, nextItemContract.abi, signer);
    const approveResult = await contract.isApprovedForAll(userAddress, nextMarketContract.address)
    return approveResult
  } catch (error) {
    console.error(error)
    return false
  }
}
