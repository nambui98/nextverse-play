
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Box } from '@mui/system';
import AccountInfo from './accountInfo';

export const Navbar = () => {

  return <Toolbar disableGutters sx={{ height: `100%`, color: `#5A6178` }}>

    <Box sx={{ flexGrow: 1 }} />
    {/* <Box sx={{ marginLeft: 2, marginRight: 2, display: { xs: 'none', md: 'flex' } }}>
      <IconButton color="inherit">
        <MailIcon />
      </IconButton>
      <IconButton
        color="inherit"
      >
        <NotificationsIcon />
      </IconButton>
      <IconButton
        color="inherit"
      >
        <FacebookIcon />
      </IconButton>
    </Box> */}
    <AccountInfo />
  </Toolbar >
}