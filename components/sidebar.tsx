import { Box, Button, CircularProgress, Collapse, Typography } from '@mui/material'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SettingsIcon from '@mui/icons-material/Settings';
import { ReactElement, useEffect, useState } from 'react';
import type { SxProps } from '@mui/system';
import type { Theme } from '@mui/material';
import { useRouter } from 'next/router'
import HomeIcon from 'public/images/icons/home.svg';
import MarketIcon from 'public/images/icons/market.svg';
import ShopIcon from 'public/images/icons/shop.svg';
import LandIcon from 'public/images/icons/land.svg';
import UserIcon from 'public/images/icons/user.svg';
import LeaderboardIcon from 'public/images/icons/leaderboard.svg';
import FacebookIcon from 'public/images/icons/facebook.svg';
import InstaIcon from 'public/images/icons/insta.svg';
import YoutubeIcon from 'public/images/icons/youtube.svg';
import PinterestIcon from 'public/images/icons/pinterest.svg';
import MailIcon from 'public/images/icons/mail.svg';
import ChartIcon from 'public/images/icons/chart.svg';
import ChartHoverIcon from 'public/images/icons/chartHover.svg';
import { PlayButton, SignButton } from './common/button';
import { useAuthentication } from 'contexts/AuthenticationContext';
import { SignUpSignInButton } from './utils/signupSignIn';


const NavbarSubMenu = ({ deepLevel, children }: any) => {
  return <Box sx={{
    paddingLeft: deepLevel == 0 ? 2 : 5
  }}>
    {children}
  </Box>
}


const NavbarItem = ({ isMainMenu, comingSoon, deepLevel, type, path, startIcon, title, subMenu, sx, isCollapse }: any) => {
  const router = useRouter();
  const partialMatch = router.pathname.includes(path);
  const exactMatch = router.pathname === path;
  const [open, setOpen] = useState(partialMatch || exactMatch);
  const [active,] = useState(partialMatch || exactMatch);
  const upOrDownIcon = () => subMenu && (open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />);
  const [endIcon, setEndIcon] = useState<ReactElement | undefined>(undefined);

  const handleItemClick = (e: any) => {
    e.preventDefault();
    setOpen((prevOpen) => !prevOpen);

    if (type == 'page') {
      !active && setEndIcon(<CircularProgress size={20} />);
      setTimeout(() => { router.push(path); }, 0)
    }

  }
  useEffect(() => {
    const styleIsCollapseComming: SxProps<Theme> = isCollapse ? {
      position: "absolute",
      top: 0,
      right: 0
    } : {}
    console.log(isCollapse);

    // update up/down icon for categories
    setEndIcon(upOrDownIcon());
    comingSoon && setEndIcon(<Box sx={{
      fontSize: '6px !important', color: '#c5b000', 'background': '', padding: '2px', lineHeight: '8px', width: '30px', borderRadius: '5px',
      ...styleIsCollapseComming

    }}>coming soon</Box>);
  }, [open, isCollapse])



  const menuItemStyle: SxProps<Theme> = {
    fontSize: '18px',
    fontWeight: "600",
    height: "56px",
    borderRadius: "8px",
    backgroundColor: active ? "#FB2F8A" : "transparent",
    paddingLeft: "15px",
    width: `100%`,
    color: active ? `#FFFFFF` : `#5A6178`,
    marginBottom: "16px",
    '&:hover': {
      color: active ? `#FFFFFF` : `#5A6178`,
      backgroundColor: active ? "#fb2f8bd1" : "#E9EAEF",
    },
    'svg': {
      fill: active ? `#FFFFFF` : `#A7ACB8`,
    },
    '&:hover svg': {
      fill: active ? `#FFFFFF` : `#A7ACB8`,
    },
    ...sx
  }
  const subMenuItemStyle: SxProps<Theme> = {
    fontSize: '18px',
    lineHeight: '23px',
    paddingBottom: 2,
    paddingTop: 2,
    borderRadius: `0`,
    width: `100%`,
    justifyContent: 'flex-start',
    borderLeft: `3px solid`,
    borderColor: `rgba(255, 255, 255, 0.1)`,
    color: active ? `#FFFFFF` : `#5A6178`,
    boxSizing: 'border-box',
    ' svg': {
      fill: '#fff'
    },
    '*:last-child > &': {
      // paddingBottom: 0,
      // marginBottom: 4
    },
    '*:first-child > &': {
      // paddingTop: 0
    },
    '&:hover': {
      color: active ? `#FFFFFF` : `#5A6178`,
      backgroundColor: "#E9EAEF"
    },
    '&:hover svg': {
      fill: '#ffffff'
    }
  }

  const menuItemTitleStyle: SxProps<Theme> =
  {
    marginLeft: "16px",
    textAlign: 'left',
    flexGrow: 1,
    position: 'relative',
    width: "100%"

  }

  const subMenuItemTitleStyle: SxProps<Theme> =
  {
    marginLeft: -1,
    textAlign: 'left',
    flexGrow: 1,
    paddingLeft: 5,
    position: 'relative',
    '&:before': {
      content: '" "',
      borderLeft: `3px solid`,
      borderColor: active ? `#FFF` : `transparent`,
      transition: `all 0.3s ease`,
      position: 'absolute',
      left: '-3px',
      top: 0,
      width: '100%',
      height: '23px',
    }
  }

  return <Box>
    <Button disableRipple onClick={handleItemClick} color="inherit" startIcon={startIcon} endIcon={endIcon} sx={isMainMenu ? menuItemStyle : subMenuItemStyle}>
      <Box sx={isMainMenu ? (!isCollapse ? { ...menuItemTitleStyle, width: 0 } : menuItemTitleStyle) : subMenuItemTitleStyle}>
        {
          !isCollapse &&
          <Typography
            color="inherit"
            textTransform={"none"}
            variant="h5">
            {title}
          </Typography>
        }
      </Box>

    </Button >
    <Collapse in={open}>
      <Box>
        {subMenu && <NavbarSubMenu deep={deepLevel}>
          {subMenu.map((subMenuItem: any, i: number) => <NavbarItem key={i} {...subMenuItem} />)}
        </NavbarSubMenu>}
      </Box>
    </Collapse>
  </Box >
}

const menuData = [
  {
    title: 'Home',
    path: '/home',
    startIcon: <HomeIcon />,
    endIcon: <HomeIcon />,
    isMainMenu: true,
    type: 'page',
  },
  {
    title: 'SHOP',
    path: '/shop',
    startIcon: <ShopIcon />,
    isMainMenu: true,
    type: 'page',
  },
  // {
  //   title: 'INVENTORY',
  //   path: '/inventory',
  //   type: 'page',
  //   startIcon: <HomeIcon />,
  //   isMainMenu: true,
  //   deepLevel: 0,
  //   subMenu: [
  //     {
  //       title: 'EQUIPMENT',
  //       path: '/inventory/equipment',
  //       type: 'page',
  //       // comingSoon: true,
  //     },
  //     {
  //       title: 'AVATAR',
  //       path: '/inventory/avatar',
  //       type: 'page',
  //       // comingSoon: true,
  //     },
  //     {
  //       title: 'PETS',
  //       path: '/inventory/pets',
  //       deepLevel: 1,
  //       subMenu: [
  //         {
  //           title: 'DOGS',
  //           path: '/inventory/pets/dog',
  //           type: 'page',
  //           // comingSoon: true,

  //         },
  //         {
  //           title: 'CATS',
  //           path: '/inventory/pets/cat',
  //           type: 'page',
  //           // comingSoon: true,

  //         }

  //       ]

  //     }
  //   ]
  // },
  {
    title: 'MARKET',
    path: '/market',
    startIcon: <MarketIcon />,
    isMainMenu: true,
    // type: 'page',
    comingSoon: true,

  },
  {
    title: 'LEADERBOARD',
    path: '/leaderboard',
    startIcon: <LeaderboardIcon />,
    isMainMenu: true,
    type: 'page',
    // comingSoon: true,

  },
  {
    title: 'LAND',
    path: '/land',
    startIcon: <LandIcon />,
    isMainMenu: true,
    type: 'page',
    // comingSoon: true,


  },
  {
    title: 'User Profile',
    path: '/settings',
    startIcon: <UserIcon />,
    isMainMenu: true,
    type: 'page',
    // comingSoon: true,


  },
]
const iconBottomStyle: SxProps<Theme> = {
  svg: {
    // width: "24px",
    // height: "24px",
    fill: "#A7ACB8",
    transition: ".3s all",
    cursor: "pointer",
  },
  "&:hover .facebook": {
    fill: "#1778F2"
  },
  "&:hover .insta": {
    fill: "#C32AA3"
  },
  "&:hover .pinterest": {
    fill: "#C8232C"
  },
  "&:hover .youtube": {
    fill: "#C4302B"
  },
  "&:hover .mail": {
    fill: "#F18D31"
  }

}
export const Sidebar = ({ isCollapse }: { isCollapse: boolean }) => {
  const [isHoverButton, setIsHoverButton] = useState<boolean>(false);
  const { username, walletAddress } = useAuthentication();

  return <>
    <Box sx={{
      backgroundColor: "#F8F9FB",
      flexDirection: 'column',
      display: 'flex',
      minHeight: 'calc(100% - 136px)',
      borderRadius: "12px",
      transition: '.3s all',
      // width: isCollapse ? "88px" : "100%"
      width: "348px",
      position: 'fixed',
      top: '112px'
    }}>


      <Box sx={{
        padding: "16px"
      }}>
        {menuData.map((menuItemData, i) => <NavbarItem isCollapse={isCollapse} key={i} {...menuItemData} />)}

      </Box>
      <PlayButton sx={{ margin: "0 auto", marginTop: "95px" }} onMouseLeave={() => setIsHoverButton(false)} onMouseEnter={() => {
        setIsHoverButton(true)
      }}>
        {
          isHoverButton ? <ChartHoverIcon /> : <ChartIcon />
        }
        <Typography
          color="inherit"
          textTransform={"uppercase"}
          variant="h5">
          JUMP INTO METAVERSE
        </Typography>
      </PlayButton>
      {
        (!walletAddress && !username) &&
        <SignUpSignInButton />
      }
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{
        display: "flex",
        alignItems: "center",
        margin: "0 auto 24px auto",
        columnGap: "18px"
      }}>
        {/* <NavbarItem isMainMenu path='/settings' type='page' sx={{ marginBottom: "0", }} startIcon={<SettingsIcon />} title="SETTINGS" /> */}
        <Box sx={iconBottomStyle}>
          <FacebookIcon className="facebook" />
        </Box>
        <Box sx={iconBottomStyle}>

          <InstaIcon className="insta" fill="#A7ACB8" />
        </Box>
        <Box sx={iconBottomStyle}>

          <PinterestIcon className="pinterest" fill="#A7ACB8" />
        </Box>
        <Box sx={iconBottomStyle}>

          <YoutubeIcon className="youtube" fill="#A7ACB8" />
        </Box>
        <Box sx={iconBottomStyle}>

          <MailIcon className="mail" fill="#A7ACB8" />
        </Box>
      </Box>


    </Box>
  </>
}