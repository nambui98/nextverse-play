import { ethers, utils } from 'ethers';
import {
  nextShopContract,
  nextAuctionContract,
  nextItemContract,
  noxyContract,
  nverContract,
} from 'libs/contracts';
import {
  extractAuctionItemData,
  extractShopItemData,
  convertImageUrl,
  convertMetadataUrl,
  convertData,
} from 'libs/utils/utils';


interface Map {
  [key: string]: any;
}

const huContract: Map = {
  [noxyContract.address]: noxyContract,
  [noxyContract.address.toLowerCase()]: noxyContract,
  [nverContract.address]: nverContract,
  [nverContract.address.toLowerCase()]: nverContract,
};

export function getAllMetadata(items: any[], signer: any) {
  const itemContract = new ethers.Contract(nextItemContract.address, nextItemContract.abi, signer);
  return Promise.all(
    items.map((item: any) => item.tokenId)
      .filter((tokenId: string, idx: number, arr: string[]) => arr.indexOf(tokenId) === idx)
      .map((tokenId: string) => new Promise(async (resolve, reject) => {
        try {
          const jsonUri = await itemContract.uri(tokenId);
          const jsonData = await utils.fetchJson(convertMetadataUrl(jsonUri));
          resolve({ tokenId, ...jsonData, image: convertImageUrl(jsonData.image) });
        } catch (error) {
          resolve({ tokenId });
        }
      }))
  );
}
interface typeItemsWithType {
  selling: any[];
  bid: any[];
  past: any[];
  upcoming: any[];
}
export const getAllItemsWithType = async function (signer: any) {
  let itemsWithType: typeItemsWithType = {
    selling: [],
    bid: [],
    past: [],
    upcoming: [],
  };
  try {
    const shopContract = new ethers.Contract(nextShopContract.address, nextShopContract.abi, signer);
    const auctionContract = new ethers.Contract(nextAuctionContract.address, nextAuctionContract.abi, signer);
    const [shopItems, auctionItems] = await Promise.all([
      shopContract.getOnSaleItems(),
      auctionContract.getOnBiddingItems(),
    ]);
    console.log(convertData(shopItems), Date.now());

    const readableItems = [...convertData(shopItems), ...convertData(auctionItems)];
    debugger
    readableItems.forEach(item => {
      if (Date.now() < item.startTime)
        itemsWithType.upcoming.push({ ...item, type: 'upcoming' });
      else if (Date.now() >= item.endTime)
        itemsWithType.past.push({ ...item, type: 'past' });
      else if (item.auctionId)
        itemsWithType.bid.push({ ...item, type: 'bid' });
      else
        itemsWithType.selling.push({ ...item, type: 'selling' });
    });
    console.log('getAllItemsWithType', itemsWithType);
  } catch (error) {
    console.error('getAllItemsWithType', error);
  }
  return itemsWithType;
}

export const getRawShopItems = async function (signer: any, len?: number) {
  let dataItems: any[] = [];
  try {
    const shopContract = new ethers.Contract(nextShopContract.address, nextShopContract.abi, signer);
    console.time('getRawShopItems');
    const rawItems = await shopContract.getOnSaleItems();
    console.timeEnd('getRawShopItems');
    const readableItems = extractShopItemData(rawItems);
    dataItems = readableItems.slice(0, len || readableItems.length);
    console.log('getRawShopItems', dataItems);
  } catch (error) {
    console.error('getRawShopItems', error);
  }
  return dataItems;
};

export const getShopItems = async function (signer: any, len?: number) {
  let dataItems: any[] = [];
  try {
    const shopContract = new ethers.Contract(nextShopContract.address, nextShopContract.abi, signer);
    console.time('getShopItems getOnSaleItems');
    const rawItems = await shopContract.getOnSaleItems();
    console.timeEnd('getShopItems getOnSaleItems');
    const readableItems = extractShopItemData(rawItems);
    const sliceItems = readableItems.slice(0, len || readableItems.length);
    console.time('getShopItems getItemMetadata');
    dataItems = await getMetadataItems(sliceItems, signer);
    console.timeEnd('getShopItems getItemMetadata');
    console.log('getShopItems', dataItems, readableItems);
  } catch (error) {
    console.error('getShopItems', error);
  }
  return dataItems;
};

export const getRawAuctionItems = async function (signer: any, len?: number) {
  let dataItems: any[] = [];
  try {
    const auctionContract = new ethers.Contract(nextAuctionContract.address, nextAuctionContract.abi, signer);
    console.time('getRawAuctionItems');
    const rawItems = await auctionContract.getBiddingItems();
    console.timeEnd('getRawAuctionItems');
    const readableItems = extractAuctionItemData(rawItems);
    dataItems = readableItems.slice(0, len || readableItems.length);
    console.log('getRawAuctionItems', dataItems);
  } catch (error) {
    console.error('getRawAuctionItems', error);
  }
  return dataItems;
};

export const getAuctionItems = async function (signer: any, len?: number) {
  let dataItems: any[] = [];
  try {
    const auctionContract = new ethers.Contract(nextAuctionContract.address, nextAuctionContract.abi, signer);
    console.time('getAuctionItems getBiddingItems');
    const rawItems = await auctionContract.getBiddingItems();
    console.timeEnd('getAuctionItems getBiddingItems');
    const readableItems = extractAuctionItemData(rawItems);
    const sliceItems = readableItems.slice(0, len || readableItems.length);
    console.time('getAuctionItems getItemMetadata');
    dataItems = await getMetadataItems(sliceItems, signer);
    console.timeEnd('getAuctionItems getItemMetadata');
    console.log('getAuctionItems', dataItems, readableItems);
  } catch (error) {
    console.error('getAuctionItems', error);
  }
  return dataItems;
};

export const approveTokenToPurchase = function (signer: any, tokenContract: any, amount: any) {
  return approveToken(signer, tokenContract, amount, nextShopContract.address);
}

export const approveTokenToBid = function (signer: any, tokenContract: any, amount: any) {
  return approveToken(signer, tokenContract, amount, nextAuctionContract.address);
}

export const purchaseItem = async function (signer: any, itemId: any, itemLeft: number) {
  const signerAddress = await signer.getAddress();
  console.log('purchaseItem', { signerAddress, itemId });
  try {
    const shopContract = new ethers.Contract(nextShopContract.address, nextShopContract.abi, signer);
    const purchaseWait = await shopContract.purchaseItem(itemId, { from: signerAddress });
    const purchaseResult = await purchaseWait.wait();
    console.log('purchaseResult', purchaseResult);
    return {
      itemId,
      itemLeft: itemLeft - 1
    };
  } catch (error: any) {
    console.error(error);
    return { error: extractErrorMessage(error) };
  }
};

export const bidItem = async function (signer: any, auctionId: any, amount: any) {
  const signerAddress = await signer.getAddress();
  console.log('bidItem', { signerAddress, auctionId, amount });
  try {
    const auctionContract = new ethers.Contract(nextAuctionContract.address, nextAuctionContract.abi, signer);
    const bidWait = await auctionContract.bid(auctionId, utils.parseUnits(`${amount}`), { from: signerAddress });
    const bidResult = await bidWait.wait();
    console.log('bidResult', bidResult);
    return {
      auctionId,
      highestPrice: `${amount}`,
      highestBidder: signerAddress,
    };
  } catch (error: any) {
    console.error(error);
    return { error: extractErrorMessage(error) };
  }
};

async function getMetadataItems(items: any[], signer: any) {
  const itemContract = new ethers.Contract(nextItemContract.address, nextItemContract.abi, signer);
  const dataItems = await Promise.all(
    items.map((data: any) => new Promise(async (resolve, reject) => {
      try {
        const jsonUri = await itemContract.uri(data.tokenId);
        const jsonData = await utils.fetchJson(convertMetadataUrl(jsonUri));
        resolve({ ...data, ...jsonData, image: convertImageUrl(jsonData.image) });
      } catch (error) {
        resolve({ ...data });
      }
    }))
  );
  return dataItems;
}

async function approveToken(signer: any, tokenContract: any, amount: any, toAddress: any) {
  const fromAddress = await signer.getAddress();
  console.log('approveToken', { fromAddress, toAddress, tokenContract, amount });
  if (!huContract[tokenContract]) {
    console.error('huContract not found', tokenContract);
    return false;
  }
  try {
    const contract = new ethers.Contract(huContract[tokenContract].address, huContract[tokenContract].abi, signer);
    const approveWait = await contract.approve(toAddress, utils.parseUnits(`${amount}`), { from: fromAddress });
    const approveResult = await approveWait.wait();
    console.log('approveResult', approveResult);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

function extractErrorMessage(error: any) {
  const splitter = 'execution reverted:';
  if (error && error.data && error.data.message)
    return error.data.message.split(splitter).join(' ').trim();
  return error && error.message || error;
}
