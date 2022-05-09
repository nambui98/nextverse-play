import { 
  getLoginNonce,
  login,
  logout,
  register,
  addWalletToExistingAccount,
  addUserToExistingAccount,
} from '../libs/apis/authentication';
import UserService from './user.service';

class AuthenticationService {
  getNonce(walletAddress: string) {
    return new Promise(async (resolve, reject) => {
      try {
        await getLoginNonce(walletAddress).then(res => {
          localStorage.setItem("login-nonce", JSON.stringify(res.data.nonce))
          resolve(res.data)
        })
      } catch (err) {
        reject(err);
      }
    })
  }
  
  login(grantType: string, data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        await login(grantType, data).then(res => {
          resolve(res.data)
          this.setCurrentUser('refreshToken', res.data.refreshToken)
          this.setCurrentUser('accessToken', res.data.accessToken)
        })
      } catch (err) {
        reject(err)
      }
    })
  }
  
  setCurrentUser(field: any, value: any) {
    const userStr = localStorage.getItem("user")
    if (userStr) {
      let user = JSON.parse(userStr);
      user[field] = value
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      let user: any = {}
      user[field] = value
      localStorage.setItem("user", JSON.stringify(user))
    }
  }
  
  logout() {
    return new Promise(async(resolve, reject) => {
      try {
        await logout().then(res => {
          if (res) {
            localStorage.removeItem("user")
          }
          resolve(res)
        })
      } catch (err) {
        reject(err)
      }
    })
  }
  
  register(data: any) {
    return new Promise(async(resolve, reject) => {
      try {
        await register(data).then(res => {
          resolve(res)
        })
      } catch (err) {
        reject(err)
      }
    })
  }
  
  addWalletToExistingAccount(data: any) {
    return new Promise(async(resolve, reject) => {
      try {
        await  addWalletToExistingAccount(data).then(res => {
          resolve(res)
        })
      } catch (err) {
        reject(err)
      }
    })
  }

  addUserToExistingAccount(data: any) {
    return new Promise(async(resolve, reject) => {
      try {
        await addUserToExistingAccount(data).then(res => {
          resolve(res)
        })
      } catch (err) {
        reject(err)
      }
    })
  }
}

export default new AuthenticationService()