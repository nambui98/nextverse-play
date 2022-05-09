
import * as React from 'react';
import { styled } from '@mui/system';
import { Button, Fab } from '@mui/material';
import { LoadingButton } from '@mui/lab';
const PlayButton = styled(Button)({
  width: '312px',
  height: '56px',
  position: "relative",
  borderRadius: "8px",
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  color: '#EC0CB7',
  '&::before': {
    content: '" "',
    position: "absolute",
    inset: "0",
    borderRadius: "8px",
    padding: "2px",
    backgroundImage: 'linear-gradient(#EC0CB7 100%, #C740D1 100%)',
    '-webkit-mask': 'linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)',
    '-webkit-mask-composite': 'xor',
    'mask-composite': 'exclude'
  },
  '&:hover': {
    backgroundImage: 'linear-gradient(268.2deg, #EC0CB7 0%, #C740D1 100%)',
    color: "#fff"
  },
  svg: {
    marginRight: "8px"
  }
});

const SignButton = styled(Button)({
  width: '312px',
  height: '56px',
  position: "relative",
  borderRadius: "8px",
  border: '2px solid #55C8FC',
  display: 'flex',
  alignItems: 'center',
  color: '#55C8FC',

  '&:hover': {
    backgroundColor: '#55C8FC',
    color: "#fff"
  },
  svg: {
    marginRight: "8px"
  }
});

const WalletButton = styled(Button)({
  width: '256px',
  height: '56px',
  position: "relative",
  borderRadius: "8px",
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  color: '#fff',
  backgroundImage: 'linear-gradient(180deg, #3EE699 0%, #27C2B4 100%)',
  '&:hover': {
    backgroundImage: 'linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), linear-gradient(180deg, #3EE699 0%, #27C2B4 100%);',
  },
  svg: {
    marginRight: "8px"
  }
});

const StoreButton = styled(Button)({
  width: '164px',
  height: '64px',
  position: "relative",
  borderRadius: "8px",
  border: '2px solid transparent',
  display: 'flex',
  alignItems: 'center',
  color: '#31373E',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  backgroundColor: "#fff",
  '&:hover': {
    border: '2px solid #FB2F8A',
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.35)',
    backgroundColor: "#F8F9FB",
  },
  svg: {
    marginRight: "12px"
  }
});

const CircleButton = styled(Fab)({
  backgroundImage: "linear-gradient(180deg, #EC0CB7 0%, #C740D1 100%)",
  position: "relative",
  boxShadow: "none",
  zIndex: 1,
  '&:before': {
    content: '" "',
    backgroundImage: 'linear-gradient(180deg, #EC0CB7 0%, #C740D1 100%)',
    position: "absolute",
    top: '-4px',
    right: '-4px',
    width: 'calc(100% + 8px)',
    height: 'calc(100% + 8px)',
    zIndex: -1,
    opacity: '.3',
    borderRadius: "50%"
  }
});

const FilterButton = styled(Button)({
  fontWeight: '600',
  fontSize: '18px',
  textTransform: "none",
  color: "text.primary",
  borderRadius: "12px",
  border: '1px solid #E9EAEF'
});
const PrimaryButton = styled(Button)({
  borderRadius: "12px",
  border: '1px solid #EC0CB7',
  display: 'flex',
  alignItems: 'center',
  color: '#EC0CB7',
  transition: '.3s all',
  '&:hover': {
    backgroundImage: 'linear-gradient(268.2deg, #EC0CB7 0%, #C740D1 100%)',
    color: "#fff",
  },
})

const LoadingButtonPrimary = styled(LoadingButton)((props: any) => ({
  borderRadius: "12px",
  border: '1px solid #EC0CB7',
  color: '#030103',
  transition: '.3s all',
  cursor: 'pointer',
  '&:hover, &.active': {
    backgroundImage: 'linear-gradient(268.2deg, #EC0CB7 0%, #C740D1 100%)',
    color: props.loading ? "transparent" : "#fff",
  },

}));

export {
  PlayButton,
  SignButton,
  WalletButton,
  StoreButton,
  CircleButton,
  FilterButton,
  PrimaryButton,
  LoadingButtonPrimary
}