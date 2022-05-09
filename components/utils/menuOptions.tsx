import { Box } from '@mui/system';
import { IconButton, Menu, MenuItem } from '@mui/material';
import OptionIcon from '@mui/icons-material/MoreVert';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

export const MenuOptions = ({options}: any) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  
  return (
  <>
    <Box sx={{ flexGrow: 0 }}>
      <IconButton onClick={handleOpenUserMenu} sx={{ paddingRight: 0 }}>
        <OptionIcon sx={{ color:'#fff', fontSize: 25 }}/>
      </IconButton>
      <Menu
        sx={{
          marginTop: '50px',
        }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        PaperProps={{
          style: {
            background: '#9b96af'
          }
        }}
      >
        {options?.map((option: any, idx: number) => (
          <MenuItem key={idx} onClick={option.action}>
            <Box paddingRight={1}>
              {option.icon}
            </Box>
            <Typography sx={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: 16,
              fontFamily: 'Sansation',
              textTransform: 'uppercase',
              textAlign: 'center',
              '&:hover': {
                color: '#ffffff'
              }
            }}>
              {option.title}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  </>
  )
}
