import { Box } from '@mui/system';
import { useState } from 'react';
import { MyModal } from 'components/utils/modal';
import {
  Button,
  Stack,
  Grid,
  Typography,
  IconButton,
  Link,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import metamaskIcon from 'public/images/metamask.png';
import { useWallet, changeNetwork, requestWalletAccount } from 'contexts/WalletContext';
import { useAuthentication } from '../../contexts/AuthenticationContext';
import { ToastUtils } from './toastMessageUtils';
import UserService from '../../services/user.service';
// import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { WalletButton } from 'components/common/button';
import WalletIcon from 'public/images/icons/wallet.svg';

interface Map {
  [key: string]: any;
}

enum WalletName {
  METAMASK = 'MetaMask',
}

const walletByName: Map = {
  [WalletName.METAMASK]: {
    logo: metamaskIcon.src,
  },
};

export const ConnectWalletButton = ({ big }: any) => {
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [changeAccountPopupOpen, setChangeAccountPopupOpen] = useState(false)

  const handleClose = () => {
    setWalletModalOpen(false);
  };

  const handleClosePopup = () => {
    setChangeAccountPopupOpen(false);
  };

  const { metaMaskIsInstalled, chainIdIsSupported, walletAccount, provider } = useWallet();
  const { walletAddress, authenticateWithWallet } = useAuthentication()

  const handleClickConnectWallet = () => {
    const currentUser = UserService.getCurrentUser()
    if (currentUser) {
      ToastUtils.info(
        "You might be logged out if the current account is not linked with the wallet",
        "Connect wallet?"
      )
    }
    setWalletModalOpen(true)
  }

  const handleSelectWallet = async (name: string) => {
    if (!metaMaskIsInstalled) {
      let a = document.createElement('a');
      a.target = '_blank';
      a.href = 'https://metamask.io/download';
      a.click();
    } else {
      if (!walletAddress) {
        if (walletAccount) {
          await authenticateWithWallet()
        } else {
          await requestWalletAccount(provider)
        }
      }
      if (!chainIdIsSupported)
        await changeNetwork(provider);
      handleClose();
    }
  };

  return (
    <>
      <WalletButton onClick={handleClickConnectWallet}>
        <WalletIcon />
        <Typography
          color="inherit"
          textTransform={"uppercase"}
          variant="h5">

          Connect Wallet
        </Typography>
      </WalletButton>
      {/* <Button
        onClick={handleClickConnectWallet}
        sx={{
          // background: `linear-gradient(180deg, #9626C7 46.35%, #D025C2 99.99%, #1427D3 100%);`,
          background: `linear-gradient(180deg, #1B31FF 0%, #1427D3 100%)`,
          textShadow: `0px 4px 4px rgba(0, 0, 0, 0.25)`,
          color: '#FFF',
          paddingTop: big ? 3 : 2,
          paddingBottom: big ? 3 : 2,
          paddingLeft: big ? 5 : 3,
          paddingRight: big ? 5 : 3,
          borderRadius: '8px',
          cursor: 'pointer',
          fontFamily: 'Sansation',
          fontSize: big ? '1.5rem' : '1.25rem',
          lineHeight: big ? '1.5rem' : '1.25rem',
          fontWeight: 700,
        }}
        startIcon={<WalletIcon />}
      >
        Connect Wallet
      </Button> */}
      <MyModal open={changeAccountPopupOpen} onClose={handleClosePopup}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '556px',
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            border: '1px solid #103187',
            borderRadius: '10px',
            p: '2.7rem',
          }}
        >
          <Typography>Hi</Typography>
        </Box>
      </MyModal>
      <MyModal open={walletModalOpen} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '556px',
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            border: '1px solid #103187',
            borderRadius: '10px',
            p: '2.7rem',
          }}
        >
          <IconButton
            aria-label="delete"
            size="small"
            sx={{
              color: '#fff',
              padding: '0',
              position: 'absolute',
              right: '2.7rem',
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            id="modal-modal-description"
            variant="body2"
            color="#5A6178"
            style={{ textTransform: 'uppercase' }}
          >
            Choose wallet
          </Typography>
          <Typography
            id="modal-modal-title"
            variant="h1"
            color="#fff"
            fontSize="24px"
            fontWeight="500"
            style={{ textTransform: 'uppercase' }}
            marginTop="1rem"
          >
            Recommended wallet
          </Typography>
          <Stack spacing={8} marginTop="2rem">
            {Object.values(WalletName).map((name, i) => (
              <Grid
                key={i}
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item display="flex" alignItems="center">
                  <img src={walletByName[name].logo} width={32} height="32" />
                  <Typography
                    variant="body2"
                    component="span"
                    fontSize="18px"
                    lineHeight="2rem"
                    marginLeft="2rem"
                    color="#fff"
                  >
                    {name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    onClick={() => {
                      handleSelectWallet(name);
                    }}
                    sx={{
                      border: '1px solid #1B31FF',
                      borderRadius: '8px',
                      padding: '1.3rem 2rem',
                      color: '#fff',
                      fontSize: '14px',
                      fontWeight: '700',
                      lineHeight: 1,
                    }}
                  >
                    Connect
                  </Button>
                </Grid>
              </Grid>
            ))}
          </Stack>
          <Grid container justifyContent="center" marginTop="32px">
            <Link
              component="button"
              variant="body2"
              fontWeight="normal"
              fontSize="16px"
              color="#1B31FF"
            >
              How to connect wallet
            </Link>
          </Grid>
        </Box>
      </MyModal>
    </>
  );
};
