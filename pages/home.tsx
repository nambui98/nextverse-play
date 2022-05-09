import AppleIcon from '@mui/icons-material/Apple';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import { Stack, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import { StoreButton } from 'components/common/button';
import { Layout } from 'components/layout';
import { SwiperSlide } from 'components/utils/swiper';
import type { NextPage } from 'next';
import OculusIcon from 'public/images/icons/gg_oculus.svg';
import GooglePlayIcon from 'public/images/icons/googlePlay.svg';
import { Autoplay, EffectFade, Pagination } from 'swiper';
import "swiper/css";
import "swiper/css/pagination";
import { Swiper } from 'swiper/react';
const TypographyButton = ({ textAbove, textUnder }: {
  textAbove: string,
  textUnder: string
}) => {
  return <Typography
    color="inherit"
    textTransform={"none"}
    fontFamily="Cabin"
    textAlign="left"
    variant="h5">
    <Typography
      color="inherit"
      textTransform={"none"}
      fontFamily="Cabin"
      variant="h6">
      {textAbove}
    </Typography>
    {textUnder}
  </Typography>
}

const Home: NextPage = () => {
  const listSlide = [
    "/images/home/item1.jpg",
    "/images/home/item2.jpg",
    "/images/home/item3.png"
  ]
  const SliderWrapper = styled(Box)((props: { img: string }) => ({
    height: "100%",
    color: '#FFF',
    backgroundImage: `url(${props.img})`,
    backgroundSize: "cover",
    display: 'flex',
    alignItems: "flex-end",
    justifyContent: "space-between",

  }));
  const ContentWrapper = styled(Box)({
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 1,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    '.content': {
      width: "465px", padding: "0 0 40px 40px"
    },
    '.text': {
      fontSize: '80px', fontWeight: 600,
      lineHeight: '1.2', color: '#fff'
    },

  });
  return <Layout>
    <Box sx={{ height: 'calc(100vh - 136px)', minHeight: '800px' }}>
      <Swiper
        autoplay={{
          "delay": 2500,
        }}
        effect={"fade"}
        style={{ borderRadius: "16px" }}
        modules={[Pagination, Autoplay, EffectFade]}
        speed={600}
        pagination={{
          "clickable": false
        }} className="mySwiper">
        <ContentWrapper>
          <Box className="content">
            <Typography className='text'>Live the Metaverse life</Typography>
          </Box>
          <Stack direction="row" spacing={2} sx={{ padding: "0 68px 40px 0" }}>
            <StoreButton><AppleIcon sx={{ fontSize: "32px" }} />
              <TypographyButton textAbove="Download on" textUnder="App Store" />
            </StoreButton>
            <StoreButton><GooglePlayIcon />
              <TypographyButton textAbove="Download on" textUnder="Google Play" />
            </StoreButton>
            <StoreButton><DesktopWindowsIcon sx={{ fontSize: "32px" }} />
              <TypographyButton textAbove="Download on" textUnder="Website/PC" />
            </StoreButton>
            <StoreButton disabled><OculusIcon />
              <TypographyButton textAbove="Coming soon on" textUnder="Oculus" />
            </StoreButton>
          </Stack>
        </ContentWrapper>
        {
          listSlide.map((img: string) => <SwiperSlide>
            <SliderWrapper img={img} />
          </SwiperSlide>)
        }
      </Swiper>
    </Box>
  </Layout >
};

export default Home;
