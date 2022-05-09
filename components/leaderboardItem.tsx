import { Box, SxProps } from '@mui/system';
import { Grid, Theme } from '@mui/material';

export const LeaderboardItem = ({ data }: any) => {
  const itemStyle: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '1rem 7rem',
    '@media(max-width: 1200px)': {
      paddingRight: 0
    }
  }

  return (
    <Grid sx={{
      minHeight: '214px',
      background: 'rgba(3, 5, 27, 0.3)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxSizing: 'border-box',
      padding: 3,
      marginTop: 4,
      display: 'flex',
      // justifyContent: 'space-between'
    }}>
      <Grid sx={{
        display: 'flex',
        fontFamily: 'Ghost Clan',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '36px',
        lineHeight: '31px',
        textTransform: 'uppercase',
        color: '#FFFFFF',
      }}>
        <Box width={36}>
          {data.id + 1}
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingLeft: 10,
          '@media(max-width: 1200px)': {
            paddingLeft: 4
          }
        }}>
          <img
            src={data.img.src}
            alt={""}
          />
        </Box>
      </Grid>
      <Grid sx={{
        display: 'flex',
        flexWrap: 'wrap',
        paddingLeft: 10,
        '@media(max-width: 1200px)': {
          paddingLeft: 0
        }
      }}>
        <Grid sx={itemStyle}>
          <AssetTitle>
            Address
          </AssetTitle>
          <AssetContent>
            {data.address}
          </AssetContent>
        </Grid>
        <Grid sx={itemStyle}>
          <AssetTitle>
            Amount
          </AssetTitle>
          <AssetContent>
            {data.amount}
          </AssetContent>
        </Grid>
        <Grid sx={itemStyle}>
          <AssetTitle>
            Total value
          </AssetTitle>
          <AssetContent>
            {data.totalValue}
          </AssetContent>
        </Grid>
      </Grid>
    </Grid>
  )
}

const AssetTitle = ({ children }: any) => {
  return (
    <Box sx={{
      fontFamily: 'Euclid Circular B',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '18px',
      lineHeight: '23px',
      textTransform: 'uppercase',
      color: 'rgba(255, 255, 255, 0.6)',
    }}>
      {children}
    </Box>
  )
}

const AssetContent = ({ children }: any) => {
  return (
    <Box sx={{
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '24px',
      lineHeight: '28px',
      color: '#FFFFFF',
      textAlign: 'center',
      paddingTop: 3
    }}>
      {children}
    </Box>
  )
}

