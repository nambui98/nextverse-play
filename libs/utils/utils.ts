import { utils } from 'ethers';
import { noxyContract, nverContract } from 'libs/contracts';

interface Map {
  [key: string]: any;
}

const tokenContractNames: Map = {
  [noxyContract.address]: 'NY',
  [noxyContract.address.toLowerCase()]: 'NY',
  [nverContract.address]: 'NV',
  [nverContract.address.toLowerCase()]: 'NV',
};

export function extractShopItemData(list: any[]) {
  const shopItemKeys = ['isClosed', 'itemId', 'tokenId', 'quantity', 'itemLeft', 'price', 'startTime', 'endTime', 'tokenContract'];
  return extractItemData(shopItemKeys, list);
}

export function extractAuctionItemData(list: any[]) {
  const auctionItemKeys = ['isClosed', 'auctionId', 'tokenId', 'initialPrice', 'tickSize', 'highestPrice', 'startTime', 'endTime', 'tokenContract', 'highestBidder'];
  return extractItemData(auctionItemKeys, list);
}

export function convertData(data: any[]) {
  const newData = data.map((item: any) => {
    const objItem: any = {};
    const keys = Object.keys(item);
    for (let i = 0; i < keys.length; i++) {
      let value;
      if (isNaN(parseInt(keys[i]))) {
        if (typeof item[keys[i]] !== "string") {
          value = parseInt(item[keys[i]]._hex);
        } else {
          value = item[keys[i]];
        }
        objItem[keys[i]] = value;
      }
    }
    return objItem;
  })
  return newData;
}

export function convertImageUrl(url: string) {
  // convert 
  // ipfs://bafybeie6qs5y6uelznm6ojzlpmhmwde7hi32sfqjqw6boyw2rfxwqws3w4/Charmander.png
  // to
  // https://bafybeie6qs5y6uelznm6ojzlpmhmwde7hi32sfqjqw6boyw2rfxwqws3w4.ipfs.cf-ipfs.com/Charmander.png
  return 'https://' + url.replace('ipfs://', '').split('/').join('.ipfs.cf-ipfs.com/');
}

export function convertMetadataUrl(url: string) {
  // convert
  // https://bafyreianydepvofye7ejdbpodcfq3jhf4l6sjbkoarxehcatcnq322sob4.ipfs.dweb.link/metadata.json
  // to
  // https://bafyreianydepvofye7ejdbpodcfq3jhf4l6sjbkoarxehcatcnq322sob4.ipfs.cf-ipfs.com/metadata.json
  return url.replace('dweb.link', 'cf-ipfs.com');
}

function extractItemData(keys: string[], list: any[]) {
  let count = 0;
  let temp: Map = {};
  let tempItems: Map[] = [];
  list.forEach((raw: any, idx: number) => {
    let key = keys[count];
    temp[key] = convertDataWithKey(key, raw);
    count++;
    if (count >= keys.length) {
      count = 0;
      temp.tokenContractName = tokenContractNames[temp.tokenContract];
      tempItems.push(temp);
      temp = {};
    }
  });
  return tempItems;
}

function convertDataWithKey(key: string, raw: any) {
  if (key === 'isClosed')
    return !!raw.toNumber(); // boolean
  if (['price', 'initialPrice', 'tickSize', 'highestPrice'].includes(key))
    return utils.formatEther(raw); // ether units
  if (['tokenContract', 'highestBidder'].includes(key))
    return raw._hex; // contract address
  if (['startTime', 'endTime'].includes(key))
    return raw.toNumber() * 1000; // unix timestamp to js timestamp
  if (['quantity', 'itemLeft'].includes(key))
    return raw.toNumber();
  return raw.toString();
}
