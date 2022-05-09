import "swiper/css/bundle";
import '../styles/globals.scss';
import '../styles/swiper.css';
import type { AppProps } from 'next/app'
import { LayoutProvider } from 'contexts/LayoutContext'
import Head from 'next/head'
import bannerBg from 'public/images/banner-bg.webp'
import favicon from 'public/images/logo-square2.png'
// import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers'
import NextNProgress from 'nextjs-progressbar';
import { WalletProvider } from 'contexts/WalletContext';
import { AuthenticationProvider } from '../contexts/AuthenticationContext';

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LayoutProvider>
      <WalletProvider>
        <AuthenticationProvider>
          {/* <Web3ReactProvider getLibrary={getLibrary}> */}
          <Head>
            <title>NextVerse</title>
            <meta name="description" content="Create the next Metaverse together" />
            <meta name="author" content="NextVerse" />

            <meta property="og:title" content="NextVerse" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://www.nextverse.org/" />
            <meta property="og:description" content="Create the next Metaverse together" />
            <meta property="og:image" content={bannerBg.src} />
            <meta name="viewport" content="initial-scale=1, width=device-width" />
            <link rel="icon" href={favicon.src} />
            <link rel="apple-touch-icon" href={favicon.src} />
            <meta name="google-site-verification" content="HYiuC-O79F8rJ09CK5wwhKFlBQjNnMA9QAgaJsejIzs" />
            <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap" rel="stylesheet"></link>
            <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@100;200;300;400;500;600&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Cabin:wght@400;500;600;700&display=swap" rel="stylesheet"></link>
            <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet"></link>
          </Head>
          <NextNProgress color="#1B31FF" />
          <Component {...pageProps} />
          {/* </Web3ReactProvider> */}
        </AuthenticationProvider>
      </WalletProvider>
    </LayoutProvider >


  );
}
export default MyApp
