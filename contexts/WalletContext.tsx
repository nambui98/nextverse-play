import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers, utils } from 'ethers';
import { noxyContract, nverContract } from 'libs/contracts';
import AuthenticationService from '../services/authentication.service';
import { useAuthentication } from './AuthenticationContext';
import UserService from '../services/user.service';

interface Map {
	[key: string]: any;
}

const networks: Map = {
	['bscTestnet']: {
		chainId: `0x${Number(97).toString(16)}`,
		chainName: 'Binance Smart Chain Testnet',
		nativeCurrency: {
			name: "Binance Chain Native Token",
			symbol: "tBNB",
			decimals: 18
		},
		rpcUrls: [
			"https://data-seed-prebsc-1-s1.binance.org:8545",
			"https://data-seed-prebsc-2-s1.binance.org:8545",
			"https://data-seed-prebsc-1-s2.binance.org:8545",
			"https://data-seed-prebsc-2-s2.binance.org:8545",
			"https://data-seed-prebsc-1-s3.binance.org:8545",
			"https://data-seed-prebsc-2-s3.binance.org:8545"
		],
		blockExplorerUrls: ["https://testnet.bscscan.com"],
	},
  ['localhost8545']: {
    chainId: `0x${Number(1337).toString(16)}`,
		chainName: 'Localhost 8545',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals:18 },
    rpcUrls: ['http://127.0.0.1:8545'],
    blockExplorerUrls: ['']
  }
};
const networkKey = process.env.NEXT_PUBLIC_NETWORK || 'bscTestnet';
const network = networks[networkKey] || networks['bscTestnet'];
const supportedChainIds = [network.chainId];

interface walletContextType {
  provider: any,
  walletAccount: any,
  ethersProvider: any,
  ethersSigner: any,
  metaMaskIsInstalled: boolean,
  chainIdIsSupported: boolean,
  noxyBalance: string,
  nverBalance: string,
  updateBalance: Function,
};

const WalletContext = createContext<walletContextType>({
  provider: null,
  walletAccount: null,
  ethersProvider: null,
  ethersSigner: null,
  metaMaskIsInstalled: false,
  chainIdIsSupported: false,
  noxyBalance: '',
  nverBalance: '',
  updateBalance: () => {},
});

export function useWallet() {
	return useContext(WalletContext);
}

export async function changeNetwork(provider: any) {
  try {
    await provider.request({
      method: "wallet_addEthereumChain",
      params: [{ ...network }]
    });
  } catch (addError: any) {
    // console.error('wallet_addEthereumChain', addError);
  }
}

export async function requestWalletAccount(provider: any) {
  try {
    // await provider.request({ method: 'eth_requestAccounts' });
    await provider.request({
      method: "wallet_requestPermissions",
      params: [
        {
          eth_accounts: {}
        }
      ]
    });
  } catch (err: any) {
    if (err.code === 4001) {
      // EIP-1193 userRejectedRequest error
      // If this happens, the user rejected the connection request.
      // alert('Please connect to MetaMask.');
      return Promise.reject(err)
    } else if (err.code === -32002) {
      window.location.reload();
    }
  }
}

type Props = {
	children: ReactNode;
};

export function WalletProvider({ children }: Props) {
  let [provider, setProvider] = useState<any>();
  let [walletAccount, setWalletAccount] = useState<any>(null);
  let [ethersProvider, setEthersProvider] = useState<any>();
  let [ethersSigner, setEthersSigner] = useState<any>();
  let [isMetaMask, setIsMetaMask] = useState<boolean>(false);
  let [validChainId, setValidChainId] = useState<boolean>(false);
  let [noxyBalance, setNoxyBalance] = useState<string>('');
  let [nverBalance, setNverBalance] = useState<string>('');

  async function handleWalletAccountsChanged(accounts: any) {
    // Handle the new accounts, or lack thereof.
    // "accounts" is an array of wallet account from provider, but it can be empty.
    // if (accounts.length === 0) {
    //   // MetaMask is locked or the user has not connected any accounts
    //   alert('Please connect to MetaMask.');
    // }
    localStorage.removeItem("login-nonce")
    console.log('handleAccountsChanged', accounts);
    if (accounts.length > 0) {
      setWalletAccount(utils.getAddress(accounts[0]))
    } else {
      const currentUser = UserService.getCurrentUser()
      if (currentUser) {
        await AuthenticationService.logout().then(res => {
          window.location.reload();
        })
      } else {
        window.location.reload()
      }
    }
  }

  function handleChainChanged(chainId: any) {
    // Handle the new chain.
    // Correctly handling chain changes can be complicated.
    // We recommend reloading the page unless you have good reason not to.
    window.location.reload();
  }

  async function updateBalance() {
    if (walletAccount && ethersSigner) {
      const _noxyContract = new ethers.Contract(noxyContract.address, noxyContract.abi, ethersSigner);
      const _nverContract = new ethers.Contract(nverContract.address, nverContract.abi, ethersSigner);
      try {
        const [noxy, nver] = await Promise.all([
          _noxyContract.balanceOf(walletAccount),
          _nverContract.balanceOf(walletAccount)
        ]);
        console.log('updateBalance', noxy, nver);
        setNoxyBalance(utils.formatEther(noxy));
        setNverBalance(utils.formatEther(nver));
      } catch (error) {
        // console.error('getBalance', error);
      }
    }
  }
  
  useEffect(() => {
    updateBalance();
    return () => {};
  }, [walletAccount, ethersSigner]);

  useEffect(() => {
    const init = async () => {
      //detect whether the browser is connected to a provider
      let ethereumProvider = await detectEthereumProvider({ silent: true });
      if (ethereumProvider) {
        setProvider(ethereumProvider);
        await startApp(ethereumProvider);
      }
  
      async function startApp(_ethereumProvider: any) {
        //The provider detected by detectEthereumProvider() must be the same as window.ethereum
        if (_ethereumProvider !== window.ethereum) {
          alert('Do you have multiple wallets installed?');
          return;
        }
        if (_ethereumProvider.isMetaMask === true) {
          setIsMetaMask(true);
        }
        // Check if a MetaMask account has permission to connect to app
        const accounts = await _ethereumProvider.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setWalletAccount(utils.getAddress(accounts[0]));
        };
        const _ethersProvider = await new ethers.providers.Web3Provider(_ethereumProvider);
        setEthersProvider(_ethersProvider);
        const _ethersSigner = await _ethersProvider.getSigner();
        setEthersSigner(_ethersSigner);
        const chainId = await _ethereumProvider.request({ method: 'eth_chainId' });
        if (supportedChainIds.indexOf(chainId) >= 0) {
          setValidChainId(true);
        }
        _ethereumProvider.on('accountsChanged', handleWalletAccountsChanged);
        _ethereumProvider.on('chainChanged', handleChainChanged);
      };
    };
    init();
    return () => {
      if (provider) {
        provider.removeListener('accountsChanged', handleWalletAccountsChanged);
        provider.removeListener('chainChanged', handleChainChanged);
      }
    }
  }, []);

	const value = {
    metaMaskIsInstalled: isMetaMask,
    chainIdIsSupported: validChainId,
    provider,
    walletAccount,
    ethersProvider,
    ethersSigner,
    noxyBalance,
    nverBalance,
    updateBalance
	};

	return (
		<WalletContext.Provider value={value}>{children}</WalletContext.Provider>
	);
}
