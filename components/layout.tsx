import { Box, Grid } from '@mui/material';
import Image from 'next/image';
import { SnackbarProvider } from "notistack";
import { ReactElement, useState } from 'react';

import logo from 'public/images/logo-2.png';
import logoSquare from 'public/images/logo-square2.png';

import { Navbar } from 'components/navbar';
import { Sidebar } from 'components/sidebar';

import { ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import theme from 'src/theme';
import { ToastMessageUtils } from './utils/toastMessageUtils';
import useStyles from 'src/useStylesNotistack';
type Props = {
  children: ReactElement,
  window?: () => Window;

}

declare module '@mui/material/styles' {
  interface Palette {
    dark: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    dark?: PaletteOptions['primary'];
  }
}


export const Layout = ({ children, window }: Props) => {
  const classes = useStyles()
  const [isCollapse, setIsCollapse] = useState<boolean>(false);
  // const [lastScrollY, setLastScrollY] = useState(0);

  // useEffect(() => {
  //   window.addEventListener('scroll', (e) => {
  //     console.log(lastScrollY);
  //     if (window.scrollY > lastScrollY) { // if scroll down hide the navbar
  //       setIsCollapse(true)

  //     } else { // if scroll up show the navbar
  //       setIsCollapse(false)

  //     }
  //     setLastScrollY(window.scrollY);
  //   })
  //   return () => {
  //     window.removeEventListener('scroll', () => { })
  //   }
  // }, [])

  return <ThemeProvider theme={theme}>
    <SnackbarProvider
      maxSnack={3}
      className={classes.Root}
      hideIconVariant
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      classes={{
        variantSuccess: classes.Success,
        variantError: classes.Error,
        variantWarning: classes.Warning,
        variantInfo: classes.Info,
        root: classes.Root
      }}
    >
      <ToastMessageUtils />

      <Box sx={{
        minHeight: '100vh',
        backgroundColor: `#ffffff`,
        backgroundSize: `cover`,
        position: `relative`,
      }} >
        <Grid container sx={{ position: "fixed", backgroundColor: "#fff", zIndex: 2 }}>

          <Grid item sx={{
            zIndex: 1,
            height: `112px`,
            width: '404px',
            boxSizing: `border-box`,
            background: `rgba(255, 255, 255, 0.06)`,
            borderRight: `1px solid rgba(255, 255, 255, 0.1)`,
            borderBottom: `1px solid rgba(255, 255, 255, 0.1)`
          }} container>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: "center", paddingLeft: '24px', columnGap: "16px" }}>
              <Image src={logoSquare.src} width={83} height={64} />
              <Image src={logo.src} width={218} height={24} />
            </Box>

          </Grid>
          <Grid item xs sx={{
            zIndex: 2,
            paddingRight: 4,

            boxSizing: `border-box`,
            background: `rgba(255, 255, 255, 0.03)`,
            borderBottom: `1px solid rgba(255, 255, 255, 0.1)`
          }}>
            <Navbar />
          </Grid>
        </Grid>
        <Grid container alignItems="stretch">
          <Grid item sx={{
            paddingTop: 0,
            paddingLeft: 3,
            paddingRight: 4,
            zIndex: 1,
            minHeight: `calc(100vh - 136px)`,
            width: isCollapse ? '150px' : '404px',
            boxSizing: `border-box`,
            background: `rgba(255, 255, 255, 0.03)`,
            borderRight: `1px solid rgba(255, 255, 255, 0.1)`,
            transition: '.3s all',

          }}>
            <Sidebar isCollapse={isCollapse} />
          </Grid>
          <Grid item xs sx={{
            zIndex: 1,
            boxSizing: `border-box`,
            background: `rgba(255, 255, 255, 0.03)`,
            paddingRight: 4,
            width: '0px', // To preven the main content module slip to the bottom
            marginTop: '112px'
          }}>
            {children}
          </Grid>
        </Grid>
      </Box >
    </SnackbarProvider>
  </ThemeProvider >;
}