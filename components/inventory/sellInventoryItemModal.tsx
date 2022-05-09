import { useWallet } from '../../contexts/WalletContext';
import { useEffect, useState } from 'react';
import { approveToSellNFT, checkMarketApprovedToSellNFT } from '../../libs/market';
import { ModalContent, ModalSubtitle, ModalTitle, MyModal } from '../utils/modal';
import { Box, Grid, styled, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useAuthentication } from '../../contexts/AuthenticationContext';

export const SellInventoryItemModal = ({data, show, onClose }: any) => {
  const { chainIdIsSupported, ethersSigner } = useWallet();
  const { walletAddress } = useAuthentication()
  const [price, setPrice] = useState('')
  const [amount, setAmount] = useState('')
  const [isApproved, setIsApproved] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    if (chainIdIsSupported && walletAddress) {
      const initData = async () => {
        try {
          const approved = await checkMarketApprovedToSellNFT(ethersSigner)
          setIsApproved(approved)
        } catch (err) {
          console.log(err)
        }
      };
      initData();
    }
    return () => {};
  }, [show])

  const handleClose = (event?:object, reason?:string) => {
    if (!buttonLoading) {
      setIsApproved(false)
      setPrice('')
      setAmount('')
      setButtonLoading(false)
      onClose();
    }
  };

  const handlePriceChange = (event: any) => {
    if (isApproved)
      setPrice(event.target.value)
  }
  const handleAmountChange = (event: any) => {
    if (isApproved)
      setAmount(event.target.value)
  }

  const handleNumberOnlyKeyPress = (event:any) => {
    if (!/[0-9\.]/.test(event.key) || !isApproved) {
      event.preventDefault()
    }
  }

  const handleApproveClick = async () => {
    setButtonLoading(true);
    const approveResult = await approveToSellNFT(ethersSigner, data.tokenId, data.quantity)
    setIsApproved(approveResult)
    setButtonLoading(false)
  }


  const handleSellInventoryItem = async () => {
    setButtonLoading(true)
    console.log('sell')
    setButtonLoading(false)
  }

  return (
    <MyModal open={show} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: '779px',
          backgroundColor: '#303140',
        }}
      >
        <Box sx={{p: '4.33rem'}}>
          <Grid container spacing={8} columns={13}>
            <Grid item xs={6}>
              <img
                src={data.image}
                srcSet={data.image}
                alt={data.name}
                width="100%"
                loading="lazy"
              />
            </Grid>
            <Grid item xs={7}>
              <ModalTitle>{data.name}</ModalTitle>
              <ModalSubtitle>Amount</ModalSubtitle>
              <ModalContent>{data.quantity}</ModalContent>
              <ModalSubtitle>Current Price</ModalSubtitle>
              <ModalContent>6500 NOXY</ModalContent>
              <ModalSubtitle>Bid ends in</ModalSubtitle>
              <ModalContent>23:23:23</ModalContent>
              <ModalSubtitle>Age</ModalSubtitle>
              <ModalContent>54</ModalContent>
            </Grid>
          </Grid>
        </Box>
        <Grid container alignItems="stretch" sx={{background: '#444552'}}>
          <Grid item xs sx={{
            padding: '0 2.67rem',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap'
          }} >
            <Grid sx={{
              display: 'flex',
            }}>
              <SellInventoryItemTextField
                value={price}
                onChange={handlePriceChange}
                onKeyPress={handleNumberOnlyKeyPress}
                placeholder={'Price'}
              />
              <SellInventoryItemTextField
                value={amount}
                onChange={handleAmountChange}
                onKeyPress={handleNumberOnlyKeyPress}
                placeholder={'Amount'}
              />
            </Grid>
          </Grid>
          <Grid item xs="auto">
            <LoadingButton
              onClick={!isApproved ? handleApproveClick : handleSellInventoryItem}
              variant="contained"
              loading={buttonLoading}
              disabled={isApproved && (price === '' || amount === '' || parseFloat(amount) > parseFloat(data.quantity))}
              startIcon={<AccountBalanceWalletIcon/>}
              loadingPosition="start"
              sx={{
                fontSize: 14,
                fontWeight: 500,
                p: "3.33rem 5.16rem",
                border: 'none',
                borderRadius: 0,
                boxShadow: 'none',
                backgroundColor: isApproved ? 'rgba(255,0,0,0.8)' : 'rgb(93 95 239)',
                ':hover': {
                  backgroundColor: isApproved ? '#ff0000' : 'rgb(65, 66, 167)'
                }
              }}
            >
              {!isApproved ? "Approve NFT" : 'Sell this item'}
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </MyModal>
  )
}

const SellInventoryItemTextField = styled(TextField)({
  background: 'rgba(0, 0, 0, 0.7)',
  marginRight: 24,
  '& .MuiInputBase-input': {
    fontSize: 14,
    fontWeight: 500,
    color: 'rgba(255, 255, 255, 0.5)',
    padding: '1.2rem 2rem',
  },
  '& .Mui-disabled': {
    color: '#fff'
  },
  '& .Mui-focused': {
    borderColor: '#fff!important',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'none',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#fff!important'
  }
});
