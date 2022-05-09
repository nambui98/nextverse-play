import WarningIcon from '@mui/icons-material/Warning'
import SuccessIcon from '@mui/icons-material/CheckCircle'
import CloseIcon from '@mui/icons-material/Close'
import InfoIcon from '@mui/icons-material/NotificationsActive'
import { Box, Button, Grid } from '@mui/material';
import { useSnackbar, VariantType, WithSnackbarProps } from 'notistack';
import React from 'react';

export const ToastMessage = ({message, title, children}: any) => {
  return (
    <Grid sx={{
      width: '100%',
      paddingLeft: 2
    }}>
      <Grid container sx={{
        flexWrap: 'nowrap'
      }}>
        <Grid container>
          {children}
          <Box sx={{
            marginLeft: 3,
            fontFamily: 'Ghost Clan',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '24px',
            lineHeight: '21px',
            textTransform: 'uppercase',
            color: '#FFFFFF',
          }}>
            {title}
          </Box>
        </Grid>
      </Grid>
      <Grid container sx={{
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '16px',
        lineHeight: '24px',
        color: 'rgba(255, 255, 255, 0.6)',
        paddingTop: 3,
      }}>
        {message}
      </Grid>
    </Grid>
  )
}

let useSnackbarRef: WithSnackbarProps
export const ToastMessageUtils: React.FC = () => {
  useSnackbarRef = useSnackbar()
  return null
}

export const ToastUtils = {
  warning(message: any, title: string = 'Warning') {
    this.toast(
      <ToastMessage message={message} title={title}>
        <WarningIcon sx={{ color: '#FF902A' }} />
      </ToastMessage>,
      'warning'
    )
  },

  error(message: any, title: string = 'Error') {
    this.toast(
      <ToastMessage message={message} title={title} >
        <WarningIcon sx={{ color: '#FF2A3A' }}/>
      </ToastMessage>,
    'error'
    )
  },
  
  info(message: any, title: string = 'Info') {
    this.toast(
      <ToastMessage message={message} title={title}>
        <InfoIcon sx={{ color: '#1B31FF'}} />
      </ToastMessage>,
      'info'
    )
  },
  
  success(message: any, title: string = 'Success') {
    this.toast(
      <ToastMessage message={message} title={title}>
        <SuccessIcon sx={{ color: '#00FF57'}} />
      </ToastMessage>,
      'success'
    )
  },
  
  toast(message: any, variant: VariantType = 'info') {
    useSnackbarRef.enqueueSnackbar(
      message, 
      {
        variant,
        action: (key) => {
          const action = (key: any) => () => {
            useSnackbarRef.closeSnackbar(key)
          }
          return (
            <Button onClick={action(key)}>
              <CloseIcon sx={{color: '#fff', fontSize: 30}}/>
            </Button>
          )
        }
      }
    )
  }
}