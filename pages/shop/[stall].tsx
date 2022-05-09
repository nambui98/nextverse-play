import type { NextPage } from 'next';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useState, useEffect } from 'react';
import { Box, Skeleton } from '@mui/material';

import { Layout } from 'components/layout'
import { Stall } from 'components/shop'
import { PageTitle } from 'components/utils/pageTitle'
import { SellingItemModal, UpcomingItemModal } from 'components/shop'
import { useWallet } from 'contexts/WalletContext';
import { getAllItemsWithType, getAllMetadata } from 'libs/shop';
import { useAuthentication } from '../../contexts/AuthenticationContext';
import { SellingItems, UpcomingItems } from '../../const/shop';


export default function ShopStall({ stall, title }: any) {
  const { ethersSigner, chainIdIsSupported } = useWallet();
  const { walletAddress } = useAuthentication();
  const [dataIsUpdated, setDataIsUpdated] = useState<boolean>(false);
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    const initData = async () => {
      setDataIsUpdated(false);
      const allItems = await getAllItemsWithType(ethersSigner);
      let items = [...allItems.bid, ...allItems.selling];
      if (stall === 'upcoming')
        items = allItems.upcoming;
      setItems(items);
      setDataIsUpdated(true);
      const metadata = await getAllMetadata(items, ethersSigner);
      setItems(items.map((item:any) => {
        const itemMetadata:any = metadata.find((el:any) => el.tokenId === item.tokenId);
        return itemMetadata ? {...item, ...itemMetadata} : item;
      }));
      if (stall === 'selling') {
        setItems(SellingItems)
      } else if (stall === 'upcoming') {
        setItems(UpcomingItems)
      }
    };
    // if (ethersSigner && chainIdIsSupported && walletAddress) 
      initData();
    return () => {};
  }, [ethersSigner, chainIdIsSupported, walletAddress]);

	const [currentItem, setCurrentItem] = useState(false);
	const [show, setShow] = useState(false);
	const handleOpen = (data: any) => {
		setShow(true);
		setCurrentItem(data);
	};
	const handleClose = (data?: any) => {
    if (data && data.itemId && data.itemLeft) {
      setItems(
        items.map(
          item => item.itemId === data.itemId 
            ? {...item, itemLeft: data.itemLeft} 
            : item
        )
      )
    } else if (data && data.auctionId && data.highestPrice && data.highestBidder) {
      setItems(
        items.map(
          item => item.auctionId === data.auctionId 
            ? {...item, highestPrice: data.highestPrice, highestBidder: data.highestBidder}
            : item
        )
      )
    }
		setShow(false);
	};

	return (
		<Layout>
			<Box sx={{p: '3.5rem'}}>
				<Box sx={{ marginBottom: '2.7rem' }}>
					<PageTitle>{title}</PageTitle>
				</Box>
          <Stall
            cols={6}
            items={items}
            handleActionClick={handleOpen}
            loading={!dataIsUpdated}
          />
        {/*{(chainIdIsSupported && walletAddress) ? (*/}
        {/*) : (*/}
        {/*  <Box sx={{*/}
        {/*    fontWeight: '500',*/}
        {/*    fontSize: '26px',*/}
        {/*    lineHeight: '30px',*/}
        {/*    textTransform: 'uppercase',*/}
        {/*    textAlign: 'center',*/}
        {/*    padding: 8*/}
        {/*  }}>*/}
        {/*    Please connect your wallet to view our shop.*/}
        {/*  </Box>*/}
        {/*)}*/}
				{stall === 'selling' && <SellingItemModal data={currentItem} show={show} onClose={handleClose} />}
				{stall === 'upcoming' && <UpcomingItemModal data={currentItem} show={show} onClose={handleClose} />}
			</Box>
		</Layout>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { stall: 'selling' } },
      { params: { stall: 'upcoming' } },
      // { params: { stall: 'past' } },
    ],
    fallback: false
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const data: {[key: string]: any} = {
		selling: {
			stall: 'selling',
			title: 'Selling items',
			items: [
				// ...getAuctionItems(5),
				// ...getSellingItems(15),
        ...SellingItems
			],
		},
		upcoming: {
			stall: 'upcoming',
			title: 'Upcoming items',
			// upcomingItems: getUpcomingItems(20),
      items: [
        ...UpcomingItems
      ]
		},
	};
  return {
    props: {
			...data[`${params?.stall}`],
		}
  }
}
