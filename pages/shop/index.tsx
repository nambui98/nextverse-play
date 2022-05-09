import type { NextPage } from 'next';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Grid, Box, Typography, Button, Menu, MenuItem, Popper, Fade, Paper, Checkbox, FormControl, FormLabel, FormControlLabel, FormGroup, InputLabel, Select, Slider } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useWallet } from 'contexts/WalletContext';
import { Layout } from 'components/layout';
import { PageTitle } from 'components/utils/pageTitle';
import { Stall, SellingItemModal, UpcomingItemModal } from 'components/shop';
import { NextPageButton, PrevPageButton } from 'components/utils/pagination';
import { getAllItemsWithType, getAllMetadata } from 'libs/shop';
import { useAuthentication } from '../../contexts/AuthenticationContext';
import { PastSellingItems, SellingItems, UpcomingItems } from '../../const/shop';
import MedalStar from 'public/images/icons/medal-star.svg';
import FilterIcon from 'public/images/icons/filter.svg';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { FilterButton, PrimaryButton } from 'components/common/button';
import theme from 'src/theme';
import styled from '@emotion/styled';
import CustomizedCheckbox from 'components/utils/checkbox';
import SliderCustom from 'components/utils/slider';
import { SelectPrimary } from 'components/common/selectBox';
import { useRouter } from 'next/router';

const Shop: NextPage = () => {
  const { ethersSigner, chainIdIsSupported } = useWallet();
  const { walletAddress } = useAuthentication()
  const router = useRouter();
  const [dataIsUpdated, setDataIsUpdated] = useState<boolean>(false);
  const [sellingItems, setSellingItems] = useState<any[]>([]);
  const [upcomingItems, setUpcomingItems] = useState<any[]>([]);
  const [pastItems, setPastItems] = useState<any[]>([]);

  useEffect(() => {
    const initData = async () => {
      setDataIsUpdated(false);
      const items = await getAllItemsWithType(ethersSigner);
      const itemsUpcoming = items.upcoming.slice(0, 3);
      setUpcomingItems(itemsUpcoming);
      const itemsPast = items.past.slice(0, 5);
      setPastItems(itemsPast);
      const itemsSelling = [...items.bid.slice(0, 1), ...items.selling.slice(0, 3)];
      setSellingItems(itemsSelling);
      setDataIsUpdated(true);
      const metadata = await getAllMetadata([...itemsUpcoming, ...itemsPast, ...itemsSelling], ethersSigner);
      setSellingItems(itemsSelling.map((item: any) => {
        const itemMetadata: any = metadata.find((el: any) => el.tokenId === item.tokenId);
        return itemMetadata ? { ...item, ...itemMetadata } : item;
      }));
      setUpcomingItems(itemsUpcoming.map((item: any) => {
        const itemMetadata: any = metadata.find((el: any) => el.tokenId === item.tokenId);
        return itemMetadata ? { ...item, ...itemMetadata } : item;
      }));
      setPastItems(itemsPast.map((item: any) => {
        const itemMetadata: any = metadata.find((el: any) => el.tokenId === item.tokenId);
        return itemMetadata ? { ...item, ...itemMetadata } : item;
      }));
    };
    // if (ethersSigner && chainIdIsSupported && walletAddress) 
    initData();
    return () => { };
  }, [ethersSigner, chainIdIsSupported, walletAddress]);

  const [itemSelling, setItemSelling] = useState(false);
  const [showSelling, setShowSelling] = useState(false);
  const handleOpenSelling = (data: any) => {
    setShowSelling(true);
    setItemSelling(data);
  };
  const handleCloseSelling = (data?: any) => {
    if (data && data.itemId && data.itemLeft) {
      setSellingItems(
        sellingItems.map(
          item => item.itemId === data.itemId
            ? { ...item, itemLeft: data.itemLeft }
            : item
        )
      )
    } else if (data && data.auctionId && data.highestPrice && data.highestBidder) {
      setSellingItems(
        sellingItems.map(
          item => item.auctionId === data.auctionId
            ? { ...item, highestPrice: data.highestPrice, highestBidder: data.highestBidder }
            : item
        )
      )
    }
    setShowSelling(false);
  };

  const [itemUpcoming, setItemUpcoming] = useState(false);
  const [showUpcoming, setShowUpcoming] = useState(false);
  const handleOpenUpcoming = (data: any) => {
    setShowUpcoming(true);
    setItemUpcoming(data);
  };
  const handleCloseUpcoming = () => {
    setShowUpcoming(false);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setOpen(!open)
  };
  //ranger
  const [value1, setValue1] = useState<number[]>([20, 37]);

  const handleChange1 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - 10), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + 10)]);
    }
  };
  return (
    <Layout>
      <Box>
        <Grid container justifyContent="space-between" marginBottom="8px">
          <Grid item>
            <PageTitle>Explore our shop</PageTitle>
          </Grid>
          <Grid item>
            <PrevPageButton />
            <NextPageButton />
          </Grid>
        </Grid>
        <Grid container spacing={"40px"}>
          <Grid item xs={12}>
            <Box sx={{
              marginLeft: -4, marginRight: -4, background: '#FED0E4',
              pt: "16px"
            }}>
              <Grid container sx={{ paddingLeft: 4, paddingRight: 4 }} justifyContent="space-between" alignItems="center" height={32}>
                <Box sx={{ display: "flex", columnGap: "8px" }}>
                  <MedalStar />
                  <Typography
                    variant="h2"
                    color={"primary"}
                    fontSize="24px"
                    fontWeight="600"
                    sx={{ textTransform: 'none' }}
                  >
                    Highlights from Official Stores
                  </Typography>
                </Box>
                <Link href="">
                  <Button
                    onClick={() => router.push("/store")}
                    endIcon={<ArrowForwardIcon sx={{ marginLeft: '-4px' }} />}
                    color={"primary"}
                    sx={{
                      fontWeight: '600',
                      fontSize: '16px',
                    }}
                  >
                    <span>See all</span>
                  </Button>
                </Link>
              </Grid>
              <Stall
                name={"Highlights from Official Stores"}
                icon={<MedalStar />}
                href="/market"
                color="primary"
                bg="#FED0E4"
                cols={5}
                items={PastSellingItems.slice(8, 13)}
                handleActionClick={() => { }}
                loading={!dataIsUpdated}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{
              marginLeft: -4, marginRight: -4,
            }}>

              <Grid container sx={{ paddingLeft: 4, paddingRight: 4, height: "40px" }} justifyContent="space-between" alignItems="flex-end" height={32}>
                <Typography
                  variant="h2"
                  color={"text.primary"}
                  fontSize="24px"
                  fontWeight="600"
                  lineHeight={1}
                  textTransform="none"
                >
                  All selling Items
                </Typography>
                <FilterButton
                  variant="outlined"
                  endIcon={<FilterIcon sx={{ marginLeft: '-4px' }} />}
                  color={"primary"}
                  onClick={handleClick}
                  aria-describedby="filter"
                >
                  Filter
                </FilterButton>
                <Popper id="filter" open={open} sx={{ zIndex: 1 }} anchorEl={anchorEl} placement="bottom-end" transition>
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                      <Paper sx={{ boxShadow: '0px 2px 16px rgba(0, 0, 0, 0.25)', width: "312px", borderRadius: "12px", p: '24px', mt: "5px", mb: "5px" }}>

                        <FormControl sx={{ width: "100%" }} component="fieldset" variant="standard">
                          <FormLabel component="legend"><Typography fontSize={"16px"} fontFamily="Be Vietnam Pro" color="secondary">Type</Typography></FormLabel>
                          <FormGroup>
                            <div style={{ display: "flex" }}>
                              <FormControlLabel
                                control={
                                  <CustomizedCheckbox />
                                }
                                sx={{ width: "50%" }}
                                label={<Typography fontSize={"16px"} fontFamily="Be Vietnam Pro" fontWeight={"500"} color="#31373E">BID</Typography>}
                              />
                              <FormControlLabel
                                control={
                                  <CustomizedCheckbox />
                                }
                                label={<Typography fontSize={"16px"} fontFamily="Be Vietnam Pro" fontWeight={"500"} color="#31373E">BUY</Typography>}
                              />
                            </div>
                          </FormGroup>
                        </FormControl>
                        <FormControl sx={{ width: "100%" }} component="fieldset" variant="standard">
                          <FormLabel component="legend"><Typography fontSize={"16px"} fontFamily="Be Vietnam Pro" mt={"16px"} color="secondary">Time</Typography></FormLabel>
                          <FormGroup >
                            <FormControlLabel
                              control={
                                <CustomizedCheckbox />
                              }
                              label={<Typography fontSize={"16px"} fontFamily="Be Vietnam Pro" fontWeight={"500"} color="#31373E">Most recent</Typography>}
                            />

                          </FormGroup>
                        </FormControl>
                        <FormControl sx={{ width: "100%", mt: "10px" }}>
                          <SelectPrimary
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={10}
                          >
                            <MenuItem value={10}><Typography fontSize={"16px"} fontFamily="Be Vietnam Pro" fontWeight={"400"} color="secondary">a month</Typography></MenuItem>
                            <MenuItem value={20}><Typography fontSize={"16px"} fontFamily="Be Vietnam Pro" fontWeight={"400"} color="secondary">Thirty</Typography></MenuItem>
                          </SelectPrimary>
                        </FormControl>
                        <FormControl sx={{ width: "100%", mt: "30px" }} component="fieldset" variant="standard">
                          <FormLabel component="legend"><Typography fontSize={"16px"} fontFamily="Be Vietnam Pro" color="secondary">Price Range</Typography></FormLabel>
                          <FormGroup >
                            <FormControlLabel
                              sx={{ ml: "11px", mr: "11px" }}
                              control={
                                <SliderCustom />
                              }
                              label=""
                            />

                          </FormGroup>
                        </FormControl>

                        <PrimaryButton type="submit" sx={{ width: '120px', ml: "auto", mt: "32px" }}>
                          <Typography variant="body2" fontSize={"18px"} fontWeight="600">
                            APPLY
                          </Typography>
                        </PrimaryButton>
                      </Paper>
                    </Fade>
                  )}
                </Popper>
              </Grid>
              <Stall
                href="/market"
                cols={5}
                items={PastSellingItems.slice(0, 13)}
                handleActionClick={() => { }}
                loading={!dataIsUpdated}
              />
            </Box>
          </Grid>
        </Grid>
        <SellingItemModal
          data={itemSelling}
          show={showSelling}
          onClose={handleCloseSelling}
        />
        <UpcomingItemModal
          data={itemUpcoming}
          show={showUpcoming}
          onClose={handleCloseUpcoming}
        />

      </Box>
    </Layout>
  );
};

export default Shop;
