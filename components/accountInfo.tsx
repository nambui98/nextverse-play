
import ProfileImg from 'public/images/avatar.jpeg'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LoginIcon from '@mui/icons-material/Login'
import SignUpIcon from '@mui/icons-material/PersonAddAlt1'
import LogoutIcon from '@mui/icons-material/Logout'
import {
  Avatar,
  Button,
  Fab,
  Tooltip,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';

import { ConnectWalletButton } from 'components/utils/connectWalletButton';
import { useWallet } from 'contexts/WalletContext';
import { useAuthentication } from '../contexts/AuthenticationContext';
import { LoginButton } from './utils/loginButton';
import { SignUpButton } from './utils/signUpButton';
import { useRef, useState } from 'react';
import { MenuOptions } from './utils/menuOptions';
import { ToastUtils } from './utils/toastMessageUtils';
import { Add } from '@mui/icons-material';
import { CircleButton } from './common/button';

const TooltipTitle = ({ value }: any) => {
  return <Box >
    <Typography>{value}</Typography>
  </Box>
}

const AccountInfo = () => {
  const { chainIdIsSupported, walletAccount, noxyBalance, nverBalance } = useWallet();
  const { username, walletAddress } = useAuthentication();
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [signUpModalOpen, setSignUpModalOpen] = useState(false)

  const AuthenticationGroup = () => {
    const authenticationOption = [
      {
        icon: <LoginIcon />,
        title: 'login',
        action: () => setLoginModalOpen(!loginModalOpen)
      },
      {
        icon: <SignUpIcon />,
        title: 'signup',
        action: () => setSignUpModalOpen(!signUpModalOpen)
      }
    ]

    return (
      <>
        <ConnectWalletButton />
        <Box display={'none'}>
          <LoginButton modalOpen={loginModalOpen} setModalOpen={setLoginModalOpen} />
        </Box>
        {/* <MenuOptions options={authenticationOption}/> */}
        <Box display={'none'}>
          <SignUpButton modalOpen={signUpModalOpen} setModalOpen={setSignUpModalOpen} />
        </Box>
      </>
    )
  }

  const AccountDetail = () => {
    const { logout } = useAuthentication()
    const { walletAccount } = useWallet()
    const menuOptions = [
      {
        icon: <LogoutIcon />,
        title: 'logout',
        action: () => handleLogout()
      }
    ]
    const handleLogout = () => {
      if (walletAccount) {
        ToastUtils.info("Please disconnect your wallet to logout from the marketplace")
        return
      }
      logout()
      window.location.reload()
    }
    if (!username) {
      menuOptions.unshift({
        icon: <SignUpIcon />,
        title: 'signup',
        action: () => setSignUpModalOpen(!signUpModalOpen)
      })
    }
    return <>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          ml: 2
        }}
      >
        {/* <Typography
          color="inherit"
          variant="h5"
          fontFamily='Josefin Sans'
          sx={{
            fontWeight: 500
          }}
        >
          Wallet ID:
        </Typography> */}
      </Box>
      <Box
        sx={{
          display: 'flex',
          ml: 2
        }}
      >
        <Box sx={{
          textAlign: `left`,
        }}>
          {
            username &&
            <Typography
              color="inherit"
              variant="h5"
              sx={{
                fontWeight: 500
              }}
            >
              {username ? `Hi ${username}` : 'Hi there!'}
            </Typography>
          }
          {!username && (
            <Box display={'none'}>
              <SignUpButton modalOpen={signUpModalOpen} setModalOpen={setSignUpModalOpen} />
            </Box>
          )}
          {walletAddress && (
            <Tooltip disableInteractive placement="bottom-end" arrow title={<TooltipTitle value="Copy" />}>

              <Button
                onClick={handleCopyClick}
                sx={{
                  padding: 0,
                  color: 'inherit'
                }}
              // endIcon={<ContentCopyIcon />}
              >
                <Typography
                  color="inherit"
                  variant="h5"
                  fontSize="24px"
                  fontFamily='Josefin Sans'
                  textTransform={"none"}
                  fontWeight="500"
                >
                  Wallet ID:&nbsp;
                </Typography>
                <Typography
                  onClick={() => { navigator.clipboard.writeText(walletAddress || '') }}
                  fontFamily='Josefin Sans'
                  color="#000"
                  fontWeight="600"
                  variant="body2"
                  fontSize="24px"
                >
                  {walletAddress.slice(0, 5) + '...' + walletAddress.slice(-6)}
                </Typography>
              </Button>
            </Tooltip>
          )}

          {walletAddress && (
            <Box>
              <Typography
                variant="body1"
                fontFamily='Josefin Sans'
                textAlign="right"
              >
                {/* NOXY: {noxyBalance ? parseFloat(noxyBalance).toFixed(2) : '0.00'} |  */}
                NVER: {nverBalance ? parseFloat(nverBalance).toFixed(2) : '0.00'}
              </Typography>
            </Box>
          )}
        </Box>
        <Box sx={{ marginLeft: "20px" }}>
          <CircleButton>
            <Add sx={{ color: "#fff" }} />
          </CircleButton>

        </Box>
      </Box>
      {/* <MenuOptions options={menuOptions} /> */}
    </>
  }

  const handleCopyClick = () => {
    navigator.clipboard.writeText(`${walletAddress}`)
      .then(
        () => console.log('Copied to clipboard'),
        () => console.error('Cannot copy to clipboard'),
      )
  }

  if (walletAccount !== walletAddress) {
    return <>
      <ConnectWalletButton />
    </>
  }
  if ((!chainIdIsSupported || !walletAddress) && !username) {
    return <>
      <AuthenticationGroup />
    </>
  }

  if (!walletAddress) {
    return <>
      <ConnectWalletButton />
      <AccountDetail />
    </>
  }

  return <>
    <AccountDetail />
  </>
}

export default AccountInfo;