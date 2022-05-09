import { 
  getWalletInfo,
  getUserInfo
} from '../libs/apis/user';

class UserService {
  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr)
      return JSON.parse(userStr)
  }
  
  getWalletInfo(walletAddress: any) {
    return new Promise(async(resolve, reject) => {
      try {
        await getWalletInfo(walletAddress).then(res => {
          resolve(res)
        })
      } catch (err) {
        reject(err)
      }
    })
  }
  
  getUserInfo() {
    return new Promise(async (resolve, reject) => {
      try {
        await getUserInfo().then(res => {
          resolve(res.data)
        })
      } catch (err) {
        reject(err)
      }
    })
  }

}

export default new UserService()