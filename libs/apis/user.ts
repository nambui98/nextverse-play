import vhIdRequest from '../utils/vhIdRequest';

export async function getWalletInfo(walletAddress: any) {
  return vhIdRequest({
    url: `/account/wallet?address=${walletAddress}`,
    method: 'get',
  })
}

export async function getUserInfo(){
  return vhIdRequest({
    url: `/me`,
    method: 'get',
  })
}
