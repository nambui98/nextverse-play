import { Button, Grid, IconButton, Input, styled, TextField, Tooltip, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import LeftArrowIcon from '@mui/icons-material/ArrowBack';
import RightArrowIcon from '@mui/icons-material/ArrowForward';
import { Box } from '@mui/system';
import { useState } from 'react';

export const LandSideBar = () => {
  const [showSidebar, setShowSideBar] = useState(true)

  const handleClickHideSidebar = () => {
    setShowSideBar(!showSidebar)
  }

  return (
    <>
      <Box>
        <Box sx={{
          width: showSidebar ? 326 : 0,
          height: `calc(100vh - 136px)`,
          zIndex: 10,
          position: 'absolute',
          background: '#1d1c37',
          borderRight: '1px solid rgb(255, 255, 255, 0.1)',
          overflow: 'auto',
          ['::-webkit-scrollbar-track']: {
            backgroundColor: '#2d2d2d',
          },
          ['::-webkit-scrollbar']: {
            width: '6px',
            backgroundColor: '#2d2d2d',
          },
          ['::-webkit-scrollbar-thumb']: {
            backgroundColor: '#1a162d',
          },
          transitionProperty: 'all',
          transitionDuration: '.5s',
          transitionTimingFunction: 'ease'
        }}>
          <Typography sx={{
            fontFamily: 'Euclid Circular B',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: '18px',
            lineHeight: '23px',
            textTransform: 'uppercase',
            padding: '1.8rem 0rem 1rem 3rem',
            borderBottom: '1px solid rgb(255, 255, 255, 0.1)',
          }}>
            Map
          </Typography>
          <Box padding={'1rem 0rem 2.9rem 3.4rem'} borderBottom={'1px solid rgb(255, 255, 255, 0.1)'}>
            <LandDescriptionContent color={'#988e8d'}>Reserved for updated content </LandDescriptionContent>
            <LandDescriptionContent color={'#be5dcd'}>Public area</LandDescriptionContent>
            <LandDescriptionContent color={'#661e1c'}>Reserved for brand</LandDescriptionContent>
          </Box>
          <Box padding={'2.3rem 0rem 2.9rem 3.4rem'} borderBottom={'1px solid rgb(255, 255, 255, 0.1)'}>
            <LandDesCriptionTitle>Attributes</LandDesCriptionTitle>
            <LandDescriptionContent color={'#C4C4C4'}>Common</LandDescriptionContent>
            <LandDescriptionContent color={'#C4C4C4'}>Uncommon</LandDescriptionContent>
            <LandDescriptionContent color={'#C4C4C4'}>Rare</LandDescriptionContent>
            <LandDescriptionContent color={'#C4C4C4'}>Epic</LandDescriptionContent>
            <LandDescriptionContent color={'#C4C4C4'}>Legendary</LandDescriptionContent>
          </Box>
          <Box padding={'2.3rem 0rem 2.9rem 3.4rem'} borderBottom={'1px solid rgb(255, 255, 255, 0.1)'}>
            <LandDesCriptionTitle>Size</LandDesCriptionTitle>
            <LandDescriptionContent color={'#000000'}>XXL(0)</LandDescriptionContent>
            <LandDescriptionContent color={'#fd8180'}>XL(1)</LandDescriptionContent>
            <LandDescriptionContent color={'#1e00f8'}>L(6)</LandDescriptionContent>
            <LandDescriptionContent color={'#27d0dd'}>M(50)</LandDescriptionContent>
            <LandDescriptionContent color={'#fff'}>S(200)</LandDescriptionContent>
          </Box>
          <Box borderBottom={'1px solid rgb(255, 255, 255, 0.1)'}>
            <Grid container padding={'2rem 0 0 3.4rem'} justifyContent={'space-between'}>
              <LandDesCriptionTitle>Coordinates</LandDesCriptionTitle>
              <Tooltip title={'Search land by coordinates'} placement={'right'} sx={{ marginRight: 1 }}>
                <InfoIcon />
              </Tooltip>
            </Grid>
            <Grid container padding={'0.2rem 1rem'} justifyContent={'space-between'}>
              <Grid container flexDirection={'column'} width={'145px'}>
                <Box sx={{
                  fontFamily: 'Euclid Circular B',
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                  fontSize: '14px',
                  lineHeight: '18px',
                  color: '#FFFFFF',
                }}>
                  Min(X,Y)
                </Box>
                <CoordinatesSearchTextField />
              </Grid>
              <Grid container flexDirection={'column'} width={'145px'}>
                <Box sx={{
                  fontFamily: 'Euclid Circular B',
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                  fontSize: '14px',
                  lineHeight: '18px',
                  color: '#FFFFFF',
                }}>
                  Max(X,Y)
                </Box>
                <CoordinatesSearchTextField />
              </Grid>
            </Grid>
            <Grid padding={'1.4rem 0'} display={'flex'} justifyContent={'center'}>
              <Button sx={{
                width: '304px',
                height: '35px',
                background: 'rgba(196, 196, 196, 0.7)',
                opacity: '0.7',
                color: '#fff',
                borderRadius: '20px',
                '&:hover': {
                  background: 'rgba(196, 196, 196, 1)',
                }
              }}>
                Apply
              </Button>
            </Grid>
          </Box>
        </Box>
        <IconButton onClick={handleClickHideSidebar} sx={{
          zIndex: 10,
          position: 'absolute',
          left: showSidebar ? '628px' : '314px',
          top: '178px',
          width: '45px',
          height: '45px',
          background: 'rgba(105,155,247,0.7)',
          borderRadius: '5px',
          transitionProperty: 'all',
          transitionDuration: '.5s',
          transitionTimingFunction: 'ease',
          ':hover': {
            background: 'rgba(105,155,247,1)',
          }
        }}>
          {showSidebar ? <LeftArrowIcon /> : <RightArrowIcon />}
        </IconButton>
      </Box>
    </>
  )
}

const LandDesCriptionTitle = ({ children }: any) => {
  return (
    <Typography sx={{
      fontFamily: 'Euclid Circular B',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '14px',
      lineHeight: '18px',
      textTransform: 'uppercase',
      padding: '0rem 0rem 0rem 0rem',
      color: '#FFFFFF'
    }}>
      {children}
    </Typography>
  )
}

const LandDescriptionContent = ({ children, color }: any) => {
  return (
    <Grid container paddingTop={2}>
      <Box sx={{
        width: 15,
        height: 12,
        background: color,
      }} />
      <Box sx={{
        paddingLeft: 3,
        fontFamily: 'Euclid Circular B',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '18px',
      }}>
        {children}
      </Box>
    </Grid>
  )
}

const CoordinatesSearchTextField = styled(Input)({
  // width: '145px',
  height: '38px',
  // left: '483px',
  // top: '862px',
  background: 'rgba(196, 196, 196, 0.7)',
  opacity: '0.7',
  borderRadius: '10px',
});
