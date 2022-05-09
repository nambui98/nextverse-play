import { Swiper, SwiperSlide } from "swiper/react";
import { Box } from '@mui/system';
import "swiper/css";
import "swiper/css/pagination"


import SwiperCore, {
  Parallax, Pagination, Navigation, Autoplay
} from 'swiper';
import { useEffect, useState, useRef } from 'react';

// install Swiper modules
SwiperCore.use([Parallax, Pagination, Autoplay]);


const ParalaxSwiper = ({ children }: any) => {
  const ref = useRef(null);
  return <Box sx={{ height: 'calc(100vh - 136px)', minHeight: '800px' }}>

    <Swiper
      autoplay={{
        "delay": 2500,
      }}
      style={{ borderRadius: "16px" }}
      speed={600}
      pagination={{
        "clickable": false
      }} className="mySwiper">
      {children}
    </Swiper>
  </Box>
}

export { ParalaxSwiper, SwiperSlide };