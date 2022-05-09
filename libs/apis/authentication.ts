import vhIdRequest from '../utils/vhIdRequest';

export async function getLoginNonce(walletAddress: string) {
  return vhIdRequest({
    url: `/auth/nonce?walletId=${walletAddress}`,
    method: 'get',
  })
}


export async function login(grantType: string, payload: any) {
  return vhIdRequest({
    url: `/auth/token?grant_type=${grantType}`,
    method: 'post',
    data: payload,
  })
}

export async function logout() {
  return vhIdRequest({
    url: `/logout`,
    method: 'patch',
    data: {}
  })
}

export async function register(payload: any) {
  return vhIdRequest({
    url: `/signup`,
    method: 'post',
    data: payload
  })
}

export async function registerToConnectedWallet(payload: any) {
  return vhIdRequest({
    url: `/account/user`,
    method: 'put',
    data: payload
  })
}

export async function addWalletToExistingAccount(payload: any) {
  return vhIdRequest({
    url: `/account/wallet`,
    method: 'put',
    data: payload
  })
}

export async function addUserToExistingAccount(payload: any) {
  return vhIdRequest({
    url: `/account/user`,
    method: 'put',
    data: payload
  })
}