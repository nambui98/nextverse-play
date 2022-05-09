import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useWallet } from './WalletContext';
import AuthenticationService from '../services/authentication.service';
import UserService from '../services/user.service';
import { ToastUtils } from '../components/utils/toastMessageUtils';

interface authenticationContextType {
  username: any,
  walletAddress: any,
  authenticateWithWallet: Function,
  authenticateWithPassword: Function,
  getUserInfo: Function,
  logout: Function,
}

const AuthenticationContext = createContext<authenticationContextType>({
  username: null,
  walletAddress: null,
  authenticateWithWallet: () => {},
  authenticateWithPassword: () => {},
  getUserInfo: () => {},
  logout: () => {},
})

export function useAuthentication() {
  return useContext(AuthenticationContext)
}

type Props = {
  children: ReactNode;
};

export function AuthenticationProvider({ children }: Props) {
  const [username, setUsername] = useState<any>(null)
  const [walletAddress, setWalletAddress] = useState<any>(null)

  const { walletAccount, ethersSigner } = useWallet();
  
  async function getUserInfo() {
    try {
      await UserService.getUserInfo().then((res: any) => {
        AuthenticationService.setCurrentUser('username', res.username)
        setUsername(res.username)
        if (res.walletAddress === walletAccount) {
          AuthenticationService.setCurrentUser('walletAddress', walletAccount)
          setWalletAddress(walletAccount)
        } else if (res.walletAddress) {
          AuthenticationService.setCurrentUser('walletAddress', null)
          setWalletAddress(null)
          ToastUtils.info(
            `We found the wallet ${res.walletAddress} linked with your account, connect to start trading`,
          )
        }
      })
    } catch(err) {
      ToastUtils.error(err)
    }
  }
  
  async function signAuthenticationMessage() {
    try {
      const loginNonceStr = localStorage.getItem("login-nonce");
      let nonce
      if (loginNonceStr) {
        nonce = JSON.parse(loginNonceStr)
      } else {
        nonce = await AuthenticationService.getNonce(walletAccount).then((res: any) => {
          return res.nonce
        })
      }
      ToastUtils.info(
        `Wallet ${walletAccount} is connected. Sign message to login or disconnect to use other wallet`
      )
      const message = walletAccount + nonce
      const signature = await ethersSigner.signMessage(message)
      return {
        signature: signature,
        message: {
          address: walletAccount,
          nonce: nonce
        },
      }
    } catch (err: any) {
      return Promise.reject(err)
    }
  }

  async function authenticateWithWallet() {
    if (walletAccount && ethersSigner) {
      try {
        const currentUser = UserService.getCurrentUser()
        if (!currentUser) {
          const payload = await signAuthenticationMessage()
          await AuthenticationService.login('wallet_address', payload)
        } else {
          const walletData = await UserService.getWalletInfo(walletAccount).then((res: any) => {
            return res.data
          })
          if (walletData) {
            const currentWalletAddress = await UserService.getUserInfo().then ((res: any) => {
              return res.walletAddress
            })
            if (currentWalletAddress !== walletAccount) {
              await logout()
              const payload = await signAuthenticationMessage()
              await AuthenticationService.login('wallet_address', payload)
            }
          } else {
            const payload = await signAuthenticationMessage()
            await AuthenticationService.addWalletToExistingAccount(payload)
          }
        }
        localStorage.removeItem("login-nonce")
        await getUserInfo()
      } catch (err: any) {
        if (err.code === 4001) {
          ToastUtils.warning('Please sign authentication message to verify your account')
        }
      }
    }
  }
  
  async function authenticateWithPassword(data: any) {
    try {
      await AuthenticationService.login('password', data)
      await getUserInfo()
    } catch (err) {
      return Promise.reject(err)
    }
  }
  
  async function logout() {
    try {
      const currentUser = UserService.getCurrentUser()
      if (currentUser) {
        await AuthenticationService.logout()
        setWalletAddress(currentUser.walletAddress)
        setUsername(currentUser.username)
      }
    } catch (err) {
      console.log(err)
    }
  }
  
  useEffect(() => {
    const init = async () => {
      const currentUser = UserService.getCurrentUser()
      if (currentUser) {
        try {
          await UserService.getUserInfo().then((res: any) => {
            setUsername(res.username)
            AuthenticationService.setCurrentUser('username', res.username)
            if(res.walletAddress === walletAccount) {
              AuthenticationService.setCurrentUser('walletAddress', res.walletAddress)
              setWalletAddress(res.walletAddress)
            }
          })
        } catch (err) {
          console.log(err)
        }
      }
    }
    
    init()
  }, [])
  
  useEffect(() => {
    const currentUser = UserService.getCurrentUser()
    if (currentUser) {
      if (currentUser.walletAddress === walletAccount) {
        AuthenticationService.setCurrentUser('walletAddress', currentUser.walletAddress)
        setWalletAddress(currentUser.walletAddress)
      } else {
        authenticateWithWallet()
      }
    } else {
      authenticateWithWallet()
    }
  }, [walletAccount, ethersSigner])
  
  const value = {
    username: username,
    walletAddress,
    authenticateWithWallet,
    authenticateWithPassword,
    getUserInfo,
    logout,
  }
  
  return (
    <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>
  )
}