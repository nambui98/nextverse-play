import { Box, Button, Grid, ImageList, ImageListItem, Skeleton, Stack, Theme } from '@mui/material';
import { useEffect, useState } from 'react';
import { PageTitle } from './utils/pageTitle';
import { SearchField } from './utils/searchField';
import { SortBox } from './utils/sortBox';
import { SxProps } from '@mui/system';
import { useWallet } from '../contexts/WalletContext';
import { getUserOwnedItems } from '../libs/market';
import { InventoryCharacterPreview } from './inventory/inventoryCharacterPreview';
import { SellInventoryItemModal } from './inventory/sellInventoryItemModal';
import { InventoryItem } from './inventory/inventoryItem';
import { useAuthentication } from '../contexts/AuthenticationContext';

const options = [
  { value: '', text: 'Default' },
  { value: 'name_asc', text: 'Name Ascending' },
  { value: 'name_dsc', text: 'Name Descending' },
  { value: 'quantity_asc', text: 'Quantity Ascending' },
  { value: 'quantity_dsc', text: 'Quantity Descending' }
]

const sampleItemsOwnedModel = [
  {modelPath: '/male_hair.glb', modelName: 'male_hair'},
  {modelPath: '/hoodie.glb', modelName: 'hoddie'},
  {modelPath: '/pant.glb', modelName: 'pant'},
  {modelPath: '/ao.glb', modelName: 'ao'}
]

export const InventoryLayOut = ({ category, title }: any) => {
  const [itemsOwned, setItemsOwned] = useState<any[]>([])
  const [searchString, setSearchString] = useState('')
  const [sortOption, setSortOption] = useState('')
  const [itemShownList, setItemShownList] = useState<any[]>([])
  const [showModalSell, setShowModalSell] = useState(false)
  const [sellItem, setSellItem] = useState(false)
  const [selectedItems, setSelectedItems] = useState<any[]>([])
  const [loadingItems, setLoadingItems] = useState(true)

  const { chainIdIsSupported, ethersSigner } = useWallet();
  const { walletAddress } = useAuthentication()

  const handleSearchItem = (event: any) => {
    let searchText = event.target.value.toLowerCase()
    setSearchString(searchText)
    if (searchText === '') {
      setItemShownList(itemsOwned.slice(0, 8))
    } else {
      let searchItemList = itemsOwned.filter((i: any) => i.name.toLowerCase().includes(searchText))
      setItemShownList(searchItemList)
    }
  }
  
  const handleSortChange = (event: any) => {
    let sortedItemsList
    if (event.target.value === '') {
      sortedItemsList = itemsOwned.slice(0, 8)
    } else {
      let searchField = event.target.value.split('_')[0]
      let sortDirection = event.target.value.split('_')[1] === 'asc' ? 1 : -1
      sortedItemsList =
        itemShownList.sort((i1, i2) => (i1[searchField] > i2[searchField] ? sortDirection : sortDirection * -1))
    }
    setItemShownList(sortedItemsList)
    setSortOption(event.target.value)
  }
  
  const handleApplyItem = (data: any) => {
    selectedItems.includes(data) 
      ? setSelectedItems(selectedItems.filter((item: any) => item.modelPath !== data.modelPath))
      : setSelectedItems(selectedItems.concat(data))
  }
  
  const handleSellItem = (data: any) => {
    setSellItem(data)
    setShowModalSell(true)
  }

  const closeSellModal = () => {
    setShowModalSell(false)
  }

  const handleShowMoreItem = () => {
    let nextShownIndex =
      (itemShownList.length + 8) > itemsOwned.length
        ? itemsOwned
        : itemsOwned.slice(itemShownList.length + 8)
    setSearchString("")
    setItemShownList(nextShownIndex)
  }

  useEffect(() => {
    if (chainIdIsSupported && walletAddress) {
      const initData = async () => {
        setLoadingItems(true)
        try {
          setItemShownList([])
          setItemsOwned([])
          const [assets] = await Promise.all([
            getUserOwnedItems(ethersSigner, walletAddress)
          ])
          let filterAssets = category 
            ? [...assets.filter((asset: any) => asset.category === category)]
            : [...assets]
          //add sample model to items
          filterAssets = filterAssets.map((asset: any, idx: any) => {
            let model = sampleItemsOwnedModel[idx]
            return {...asset, ...model}
          })
          setSelectedItems([])
          setItemShownList(filterAssets.slice(0, 8))
          setItemsOwned(filterAssets)
        } catch (err) {
          console.log(err)
        }
        setLoadingItems(false)
      };
      initData();
    }
    return () => {};
  }, [ethersSigner, chainIdIsSupported, walletAddress, category])
  
  const inventoryStyle: SxProps<Theme> = {
    maxWidth: '1526px',
    margin: 5,
    padding: 3,
    boxSizing: `border-box`,
    background: 'rgba(0, 0, 0, 0.35)',
    borderColor: '#25235d',
    borderStyle: 'solid',
    borderWidth: '1px'
  }
  
  return ( <>
    <Grid sx={inventoryStyle}>
      <Grid sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
      }}>
        <Grid item sx={{ padding: '1.2rem 2rem' }}>
          <PageTitle>{title}</PageTitle>
        </Grid>
        <Grid sx={{
          display: 'flex',
          flexWrap: 'wrap',
        }}>
          <Box sx={{
            padding: '1.3rem 0.7rem',
            '@media(max-width: 1524px)': {
              paddingLeft: '2rem'
            }
          }}>
            <SearchField searchString={searchString} handleSearchItem={handleSearchItem} />
          </Box>
          <Box sx={{ padding: '1.3rem 2rem' }}>
            <SortBox sortOption={sortOption} handleSortChange={handleSortChange} options={options} />
          </Box>
        </Grid>
      </Grid>
      { (!chainIdIsSupported || !walletAddress) ? (
        <Box sx={{
          fontWeight: '500',
          fontSize: '26px',
          lineHeight: '30px',
          textTransform: 'uppercase',
          textAlign: 'center',
          padding: 8
        }}>
          Please connect your wallet to view your inventory.
        </Box>
      ) : (
        <Grid container sx={{
          flexWrap: 'nowrap',
          '@media(max-width: 1675px)': {
            flexWrap: 'wrap'
          },
          justifyContent: 'space-between'
        }}>
          <InventoryCharacterPreview selectedItems={selectedItems} />
          <Grid sx={{
            width: '100%',
          }}>
            <Grid sx={{
              marginTop: 4,
              marginRight: 3,
              paddingLeft: 3,
              height: '100%'
            }}>
              { loadingItems ? (
                <ImageList
                  cols={3}
                  gap={32}
                >
                  {
                    Array.from(Array(3).keys()).map(key => 
                      <InventoryItemPlaceholder key={key}/>
                    ) 
                  }
                </ImageList>
              ) : itemsOwned.length === 0 ? (
                <Box sx={{
                  fontFamily: 'Euclid Circular B',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  fontSize: '24px',
                  lineHeight: '30px',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  display: 'flex',
                  height: '100%',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  Please buy your Items.
                </Box>
              ) : (
                <ImageList cols={3} gap={32}>
                  {itemShownList.map((item: any, idx: number) => (
                    <InventoryItem
                      key={idx}
                      data={item}
                      appliedItems={selectedItems}
                      handleSellItem={handleSellItem}
                      handleApplyItem={handleApplyItem}
                    />
                  ))}
                  <SellInventoryItemModal data={sellItem} show={showModalSell} onClose={closeSellModal} />
                </ImageList>
              )}
            </Grid>
            { itemShownList.length < itemsOwned.length && (
              <Grid sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                marginTop: 6
              }}>
                <Button onClick={handleShowMoreItem} sx={{
                  fontFamily: 'Euclid Circular B',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  fontSize: '18px',
                  lineHeight: '23px',
                  textAlign: 'center',
                  textDecorationLine: 'underline',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                }}>
                  Load more ...
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      )}
    </Grid>
  </>)
}

const InventoryItemPlaceholder = () => {
  return (
    <ImageListItem>
      <Stack>
        <Box sx={{
          height: 0,
          overflow: "hidden",
          paddingTop: "100%",
          position: "relative"
        }}>
          <Skeleton variant="rectangular" sx={{
            bgcolor: '#192732',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          }}/>
          <Skeleton variant="rectangular" sx={{
            backgroundColor: 'dark.main',
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "20%"
          }}/>
        </Box>
      </Stack>
    </ImageListItem>
  );
}
