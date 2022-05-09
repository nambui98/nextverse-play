import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {
  styled,
  Typography,
  Grid,
  Box,
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  TextField,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputBase,
  Fade,
  Skeleton,
  Stack,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CloseIcon from '@mui/icons-material/Close';

import { MyModal } from './utils/modal';
import { useWallet } from 'contexts/WalletContext';
import {
  approveTokenToBid,
  bidItem,
  approveTokenToPurchase,
  purchaseItem,
} from 'libs/shop';
import { useAuthentication } from '../contexts/AuthenticationContext';
import { ToastUtils } from './utils/toastMessageUtils';
import BnbIcon from 'public/images/icons/bnb.svg';
import { PlayButton, PrimaryButton } from './common/button';
import theme from 'src/theme';
import { CardItem } from './common/card';
import { PriceTypography } from './common/text';


const ProviderTag = styled('span')({
  padding: '0.7rem 1.4rem',
  color: '#fff',
  fontSize: '12px',
  fontWeight: 400,
  borderRadius: '59px',
  backdropFilter: 'blur(17px)',
  textTransform: 'uppercase',
});

const BidTag = styled('span')({
  padding: '0.5rem 1rem',
  color: '#fff',
  fontSize: 14,
  fontWeight: 500,
  border: '1px solid #fff',
  textTransform: 'uppercase',
});

const SellingModalTextField = styled(TextField)({
  background: 'rgba(0, 0, 0, 0.7)',
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
    borderColor: 'none',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'none',
  },
});
const TagWrapper = styled(Box)({
  position: "absolute",
  right: 0,
  top: 0,
  padding: "11px 8px",
  backgroundColor: "#31373E",
  zIndex: 1,
  borderBottomLeftRadius: '12px'
})
const ImageListWrapper = styled(ImageList)({
  paddingTop: "16px",
  paddingLeft: "32px",
  paddingRight: "32px",
  paddingBottom: "24px",
  margin: 0
})
const VideoWraper = styled(Box)({
  width: '100%',
  height: 0,
  position: 'relative',
  overflow: 'hidden',
  paddingTop: '100%',
  backgroundColor: "#FFFFFF",
  borderRadius: '12px 12px 0px 0px',
})
export const Stall = ({ cols, items = [], handleActionClick, loading }: any) => {
  return (

    <ImageListWrapper
      cols={cols}
      gap={33}
    >
      {loading ? (
        Array.from(Array(cols).keys()).map(key => <StallItemPlaceholder key={key} />)
      ) : items.length > 0 ? (
        items.map((item: any, idx: number) => (
          // <StallItem
          //   key={idx}
          //   data={item}
          //   onActionClick={handleActionClick}
          // />
          <CardItem>
            <TagWrapper>
              <Typography fontSize={"18px"} fontWeight="700" lineHeight={1} color="text.secondary">
                BOO
              </Typography>
            </TagWrapper>
            <Box sx={{ padding: "27px" }}>
              <VideoWraper>
                <FullWidthVideo
                  muted
                  onMouseOver={(event: any) => event.target.play()}
                  poster={item.poster}
                  playsInline
                  style={{ position: 'absolute', top: 0 }}
                >
                  <source src={item.mov} type='video/mp4; codecs="hvc1"' />
                  <source src={item.webm} type="video/webm" />
                </FullWidthVideo>
              </VideoWraper>
            </Box>
            <CardContent>
              <Typography variant="body2" fontFamily="Be Vietnam Pro" fontSize={"16px"} fontWeight="600" color="text.primary">
                RFI #2: Elevated Concrete Floor Thickness
              </Typography>
            </CardContent>
            <CardActions disableSpacing sx={{ padding: "0 16px 25px  16px" }}>
              <Box sx={{ marginRight: "auto", display: "flex", columnGap: "8px" }} aria-label="add to favorites">
                <BnbIcon />
                <Typography variant="body2" fontSize={"18px"} fontWeight="600" color="text.primary">
                  999,999
                </Typography>
              </Box>
              <PrimaryButton sx={{ width: "120px", height: "40px", color: `${theme.palette.primary}` }}><Typography variant="body2" fontSize={"18px"} fontWeight="600">
                BID NOW
              </Typography></PrimaryButton>

            </CardActions>
          </CardItem>
        ))
      ) : (
        Array.from(Array(cols).keys()).map(key => {
          return Math.floor(cols / 2) != key
            ? <Box key={key} />
            : <Box key={key} sx={{
              height: 0,
              overflow: "hidden",
              paddingTop: "100%",
              paddingBottom: "45px",
              position: "relative"
            }}>
              <Box sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: 500,
                fontSize: 32,
                textTransform: 'uppercase',
                textAlign: 'center',
              }}>
                Empty
              </Box>
            </Box>
        })
      )}
    </ImageListWrapper>
    // </Box>
  );
};

function TitleBar({ title, browseLink, color, icon }: any) {
  const router = useRouter();
  return (
    <Grid container justifyContent="space-between" alignItems="center" height={32}>


      {title ? (
        <Box sx={{ display: "flex", columnGap: "8px" }}>
          {icon}
          <Typography
            variant="h2"
            color={color || 'secondary'}
            fontSize="24px"
            fontWeight="600"
            sx={{ textTransform: 'uppercase' }}
          >
            {title}
          </Typography>
        </Box>
      ) : <Box></Box>
        //  (
        //   <Button
        //     onClick={() => router.back()}
        //     startIcon={<ArrowBackIcon sx={{ marginRight: '-2px' }} />}
        //     sx={{
        //       fontFamily: 'Sansation',
        //       fontWeight: '700',
        //       fontSize: '14px',
        //       lineHeight: 1,
        //       paddingLeft: 0,
        //     }}
        //   >
        //     <span>Back</span>
        //   </Button>
        // )
      }
      {browseLink && (
        <Link href={browseLink}>
          <Button
            endIcon={<ArrowForwardIcon sx={{ marginLeft: '-4px' }} />}
            color={color || "secondary"}
            sx={{
              fontWeight: '600',
              fontSize: '16px',
            }}
          >
            <span>See all</span>
          </Button>
        </Link>
      )}
    </Grid>
  );
}

function SquarePlaceholder({ color }: any) {
  return (
    <Box sx={{
      height: 0,
      overflow: "hidden",
      paddingTop: "100%",
      position: "relative"
    }}>
      <Skeleton variant="rectangular" sx={{
        bgcolor: color || '',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
      }} />
    </Box>
  )
}

function StallItemPlaceholder() {
  return (
    <ImageListItem>
      <Stack>
        <SquarePlaceholder color="#192732" />
        <Skeleton variant="rectangular" height={45} sx={{ bgcolor: 'dark.main' }} />
      </Stack>
    </ImageListItem>
  );
}

function StallItem({ data, onActionClick }: any) {
  let buttonDisabled = false;
  let buttonTitle = '';
  if (data.type === 'upcoming')
    buttonTitle = 'Notify me';
  else if (data.type === 'past')
    buttonTitle = 'Buy on market';
  else if (data.type === 'bid')
    buttonTitle = 'Bid';
  else {
    buttonTitle = 'Buy now';
    buttonDisabled = data.itemLeft === 0;
  }
  const [imageIsLoading, setImageIsLoading] = useState(false);
  return (
    <ImageListItem>
      {imageIsLoading && <SquarePlaceholder color="#192732" />}
      {/*<img*/}
      {/*  src={data.image}*/}
      {/*  alt={data.name}*/}
      {/*  onLoad={() => setImageIsLoading(false)}*/}
      {/*  style={imageIsLoading ? {display: 'none'} : {}}*/}
      {/*/>*/}
      <Box
        component={'div'}
        sx={{
          width: '100%',
          height: 0,
          position: 'relative',
          overflow: 'hidden',
          paddingTop: '100%',
          backgroundColor: "#FFFFFF",
          borderRadius: '12px 12px 0px 0px',

        }}
      >
        <FullWidthVideo
          // loop
          muted
          // autoPlay
          onMouseOver={(event: any) => event.target.play()}
          // onMouseOut={(event: any) => event.target.pause()}
          poster={data.poster}
          playsInline
          // style={{ imageIsLoading ? {display: 'none'} : {}, position: 'absolute', top: 0 }}
          style={{ position: 'absolute', top: 0 }}
        >
          <source src={data.mov} type='video/mp4; codecs="hvc1"' />
          <source src={data.webm} type="video/webm" />
        </FullWidthVideo>
      </Box>
      {data.type === 'bid' ? <ItemBidTag /> : <ItemProvider>boo</ItemProvider>}
      {/*{data.type === 'bid' ? (*/}
      {/*	<ItemPrice*/}
      {/*    name={data.name}*/}
      {/*    sold={0}*/}
      {/*    quantity={1}*/}
      {/*    currency={data.tokenContractName}*/}
      {/*    price={data.highestPrice}*/}
      {/*  />*/}
      {/*) : data.type === 'selling' ? (*/}
      {/*  <ItemPrice*/}
      {/*    name={data.name}*/}
      {/*    sold={data.quantity - data.itemLeft}*/}
      {/*    quantity={data.quantity}*/}
      {/*    currency={data.tokenContractName}*/}
      {/*    price={data.price}*/}
      {/*  />*/}
      {/*) : (*/}
      {/*	// <ItemTime>{new Date(data.endTime).toLocaleString()}</ItemTime>*/}
      {/*  <></>*/}
      {/*)}*/}
      <Box sx={{ height: "96px", backgroundColor: "#fff" }}>

        <ItemAction
          title={buttonTitle}
          onClick={() => onActionClick(data)}
          disabled={buttonDisabled}
        />
      </Box>
    </ImageListItem>
  );
}

function ItemBidTag() {
  return (
    <ImageListItemBar
      position="top"
      actionIcon={
        <BidTag>bid</BidTag>
      }
      // actionPosition="left"
      actionPosition="right"
      sx={{
        background: 'transparent',
        padding: '1.3rem 0',
        '&>div': { padding: 0 },
      }}
    />
  );
}

function ItemProvider({ children, rareLevel }: any) {
  const bgRare = [
    'rgba(27, 49, 255, 0.8)',
    'rgba(27, 255, 200, 0.8)',
    'rgba(241, 84, 255, 0.8)',
  ];
  return (
    <ImageListItemBar
      position="top"
      actionIcon={
        <ProviderTag
          sx={{
            backgroundColor: bgRare[rareLevel] || bgRare[0],
          }}
        >
          {children}
        </ProviderTag>
      }
      actionPosition="right"
      sx={{
        background: 'transparent',
        padding: '2rem 1rem',
        '&>div': { padding: 0 },
      }}
    />
  );
}

function ItemPrice({ name, sold, quantity, currency, price }: any) {
  return (
    <ImageListItemBar
      position="bottom"
      title={
        <Grid container direction="column">
          <Grid item display="flex" justifyContent="space-between">
            <PriceTypography>{name}</PriceTypography>
            <PriceTypography sx={{ ml: '1rem' }}>{`${currency} ${price}`}</PriceTypography>
          </Grid>
          <Grid item>
            <PriceTypography sx={{ fontSize: 10 }}>{`${sold}/${quantity} sold`}</PriceTypography>
          </Grid>
        </Grid>
      }
      sx={{
        background: 'rgba(28, 24, 35, 0.8)',
        boxShadow: '0px 4px 41px rgba(0, 0, 0, 0.5)',
        textAlign: 'left',
        padding: '.5rem .5rem',
        bottom: '3.75rem',
        backdropFilter: 'blur(2px)',
        '&>div': { padding: 0 },
      }}
    />
  );
}

function ItemTime({ children }: any) {
  return (
    <ImageListItemBar
      position="bottom"
      title={
        <span
          style={{
            textTransform: 'uppercase',
            fontWeight: 400,
            fontSize: 14,
          }}
        >
          {children}
        </span>
      }
      sx={{
        background: 'rgba(28, 24, 35, 0.8)',
        boxShadow: '0px 4px 41px rgba(0, 0, 0, 0.5)',
        textAlign: 'center',
        padding: '.84rem',
        bottom: '3.75rem',
        backdropFilter: 'blur(2px)',
        '&>div': { padding: 0 },
      }}
    />
  );
}

function ItemAction({ title, onClick, disabled }: any) {
  return (
    <ImageListItemBar
      position="below"
      title={
        <Button
          onClick={onClick}
          disabled={disabled}
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: 'dark.main',
            borderRadius: 0,
            border: 'none',
            padding: '1rem',
            fontSize: '12px',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: 'primary.main',
            },
            '&:disabled': {
              backgroundColor: '#303140',
              color: '#fff'
            }
          }}
        >
          {title}
        </Button>
      }
      sx={{
        '&>div': { padding: 0 },
      }}
    />
  );
}

function SellingModalTitle({ children }: any) {
  return (
    <Typography
      variant="h1"
      sx={{
        color: '#fff',
        fontSize: 24,
        fontWeight: 500,
        textTransform: 'uppercase',
        marginBottom: '2.6rem'
      }}
    >{children}</Typography>
  );
}

function SellingModalSubtitle({ children }: any) {
  return (
    <Typography
      variant="h2"
      sx={{
        color: 'rgba(255, 255, 255, 0.4)',
        fontSize: 18,
        fontWeight: 500,
        textTransform: 'uppercase'
      }}
    >{children}</Typography>
  );
}

function SellingModalContent({ children, text }: any) {
  return (
    <Typography
      variant="h1"
      sx={{
        color: '#fff',
        fontSize: text ? 14 : 24,
        fontWeight: 500,
        textTransform: 'uppercase',
        marginBottom: '2.6rem'
      }}
    >{children}</Typography>
  );
}

export function SellingItemModal({ data, show, onClose }: any) {
  const { ethersSigner, updateBalance } = useWallet();
  const { walletAddress } = useAuthentication()
  const [isApproved, setIsApproved] = useState(false);
  const [price, setPrice] = useState(data.price || 0);
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleClose = (data?: any) => {
    if (!buttonLoading) {
      setIsApproved(false);
      setPrice(0);
      setButtonLoading(false);
      onClose(data);
    }
  };
  const handlePriceChange = (event: any) => {
    if (!isApproved)
      setPrice(event.target.value);
  };
  const handlePriceKeyPress = (event: any) => {
    if (!/[0-9\.]/.test(event.key)) {
      event.preventDefault();
    }
  };
  const autoPrice = () => {
    if (!isApproved)
      setPrice(parseFloat(data.highestPrice) + parseFloat(data.tickSize));
  };
  const handleApproveClick = async () => {
    setButtonLoading(true);
    if (data.price) {
      const approveResult = await approveTokenToPurchase(ethersSigner, data.tokenContract, `${data.price}`);
      setIsApproved(approveResult);
    } else if (parseFloat(price) >= parseFloat(data.highestPrice) + parseFloat(data.tickSize)) {
      setPrice(parseFloat(price));
      const approveResult = await approveTokenToBid(ethersSigner, data.tokenContract, `${parseFloat(price)}`);
      setIsApproved(approveResult);
    }
    setButtonLoading(false);
  };
  const handleBuyBidClick = async () => {
    let updateItem;
    setButtonLoading(true);
    if (data.price) {
      const result = await purchaseItem(ethersSigner, data.itemId, data.itemLeft);
      if (result.error) {
        ToastUtils.error(result.error)
      } else {
        updateItem = { ...result };
        await updateBalance();
        ToastUtils.success("Purchase item successfully")
      }
    } else if (data.auctionId) {
      const result = await bidItem(ethersSigner, data.auctionId, `${price}`);
      if (result.error) {
        ToastUtils.error(result.error)
      } else {
        updateItem = { ...result };
        await updateBalance();
        ToastUtils.success('Bid item successfully')
      }
    }
    setButtonLoading(false);
    handleClose(updateItem);
  };

  useEffect(() => {
    if (show && data.highestBidder && data.highestBidder === walletAddress) {
      ToastUtils.info('You are the highest bidder')
      handleClose();
    }
    return () => { }
  }, [show]);

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
          bgcolor: '#303140',
        }}
      >
        <Box sx={{ p: '4.33rem' }}>
          <Grid container spacing={8} columns={13}>
            <Grid item xs={6}>
              <Box
                component={'div'}
                sx={{
                  width: '100%',
                  height: 0,
                  position: 'relative',
                  overflow: 'hidden',
                  paddingTop: '100%',
                }}
              >
                <FullWidthVideo
                  // loop
                  muted
                  // autoPlay
                  onMouseOver={(event: any) => event.target.play()}
                  // onMouseOut={(event: any) => event.target.pause()}
                  poster={data.poster}
                  playsInline
                  // style={{ imageIsLoading ? {display: 'none'} : {}, position: 'absolute', top: 0 }}
                  style={{ position: 'absolute', top: 0 }}
                >
                  <source src={data.mov} type='video/mp4; codecs="hvc1"' />
                  <source src={data.webm} type="video/webm" />
                </FullWidthVideo>
              </Box>
            </Grid>
            <Grid item xs={7}>
              <SellingModalTitle>Boo Item</SellingModalTitle>
              <SellingModalSubtitle>Description</SellingModalSubtitle>
              {/*<SellingModalContent text>{data.description && data.description.slice(0, 100)}</SellingModalContent>*/}
              <SellingModalContent text>Boo collection</SellingModalContent>
              {data.auctionId && <>
                <SellingModalSubtitle>Min bid increment</SellingModalSubtitle>
                <SellingModalContent>{data.tickSize}</SellingModalContent>
                <SellingModalSubtitle>Current price</SellingModalSubtitle>
                <SellingModalContent>{data.highestPrice}</SellingModalContent>
                <SellingModalSubtitle>Bid ends in</SellingModalSubtitle>
                <SellingModalContent>
                  {new Date(data.endTime).toLocaleString()}
                </SellingModalContent>
              </>}
              {data.itemId && <>
                <SellingModalSubtitle>In stock</SellingModalSubtitle>
                <SellingModalContent>{`${data.itemLeft}/${data.quantity}`}</SellingModalContent>
                <SellingModalSubtitle>Total AVAILABLE</SellingModalSubtitle>
                <SellingModalContent>{data.quantity - data.itemLeft}</SellingModalContent>
                <SellingModalSubtitle>Price</SellingModalSubtitle>
                <SellingModalContent>{data.price}</SellingModalContent>
              </>}
            </Grid>
          </Grid>
        </Box>
        <Grid container alignItems="stretch" sx={{ background: '#444552' }}>
          <Grid item padding="2.25rem 2.67rem" xs display="flex" alignItems="center">
            {data.auctionId && <>
              <SellingModalTextField
                value={price}
                onChange={handlePriceChange}
                onKeyPress={handlePriceKeyPress}
              />
              <Button
                onClick={autoPrice}
                variant="outlined"
                startIcon={<AutorenewIcon />}
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  borderRadius: 0,
                  p: "1rem 1.33rem",
                  marginLeft: "2rem",
                  color: '#fff',
                  borderColor: '#fff',
                  '&:hover': { borderColor: '#fff' }
                }}
              >
                Auto price
              </Button>
            </>}
          </Grid>
          <Grid item xs="auto">
            <LoadingButton
              onClick={!isApproved ? handleApproveClick : handleBuyBidClick}
              variant="contained"
              color={!isApproved ? "secondary" : "primary"}
              loading={buttonLoading}
              loadingPosition="start"
              startIcon={<AccountBalanceWalletIcon />}
              sx={{
                fontSize: 14,
                fontWeight: 500,
                p: "3.33rem 5.16rem",
                border: 'none',
                borderRadius: 0,
                boxShadow: 'none',
                '&:disabled': {
                  backgroundColor: !isApproved ? "secondary.light" : "primary.light",
                  color: '#fff',
                }
              }}
            >
              {!isApproved ? "Approve token" : data.itemId ? 'Buy this item' : 'Place your bid'}
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </MyModal>
  );
}

export function UpcomingItemModal({ data, show, onClose }: any) {
  const [selectValue, setSelectValue] = useState(0);
  const handleSelectChange = (event: any) => {
    setSelectValue(event.target.value);
  };
  const handleClose = () => {
    setSelectValue(0);
    onClose();
  }
  const handleSaveClick = () => {
    handleClose();
  };
  const options = [
    { value: 0, text: 'At selling time' },
    { value: 1, text: '1 minute before selling time' },
    { value: 5, text: '5 minutes before selling time' },
    { value: 15, text: '15 minutes before selling time' },
    { value: 30, text: '30 minutes before selling time' },
  ];
  return (
    <MyModal open={show} onClose={handleClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: '556px',
        background: '#47464C',
        p: '2.67rem',
        borderRadius: '10px'
      }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h1" sx={{
              color: '#fff',
              fontSize: 24,
              fontWeight: 400,
            }}>Notify about “{data.name}”</Typography>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="delete"
              size="small"
              sx={{
                color: '#fff',
                padding: '0',
              }}
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Typography sx={{
          color: '#fff',
          fontSize: 16,
          fontWeight: 400,
          marginY: '3.5rem'
        }}>
          When do you want to get notify about this item?
        </Typography>
        <FormControl fullWidth>
          <Select
            variant="outlined"
            value={selectValue}
            onChange={handleSelectChange}
            input={<InputBase sx={{
              '& .MuiInputBase-input': {
                padding: '1.5rem',
                color: '#fff',
                fontSize: 16,
                textAlign: 'center',
                border: '2px solid rgba(255, 255, 255, 0.2)',
              },
              '& .MuiSelect-icon': {
                color: '#fff',
              },
            }} />}
            MenuProps={{
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'left',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'left',
              },
              TransitionComponent: Fade,
              sx: {
                '& .MuiMenu-list': {
                  minWidth: 555,
                  padding: 0,
                  borderRadius: '4px',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                },
              }
            }}
          >
            {options.map(data => (
              <MenuItem
                key={data.value}
                value={data.value}
                disabled={data.value === selectValue}
                sx={{
                  background: '#7A7685',
                  padding: '1.5rem 2.7rem 1.5rem 1.5rem',
                  transition: 'all 0.1s',
                  '&:hover': {
                    background: '#6a6775',
                  },
                  '&.Mui-selected': {
                    background: '#7A7685',
                  }
                }}
              >
                <Typography sx={{
                  color: '#fff',
                  fontSize: 16,
                  textAlign: 'center',
                  width: '100%'
                }}>{data.text}</Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Grid container justifyContent="center">
          <Button
            onClick={handleSaveClick}
            variant="contained"
            sx={{
              marginTop: "3.5rem",
              padding: "1.25rem 3.75rem",
              fontSize: 18
            }}>
            Save
          </Button>
        </Grid>
      </Box>
    </MyModal>
  )
}

const FullWidthVideo = styled('video')({
  width: '100%',
  height: 'auto',
});
