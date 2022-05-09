import { useEffect, useState } from 'react';
import { Button, Grid, IconButton, InputAdornment, styled, TextField, Typography } from '@mui/material';
import { MyModal } from './modal';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { SignUpButton } from './signUpButton';
import { useAuthentication } from '../../contexts/AuthenticationContext';
import { LoadingButton } from '@mui/lab';

export const LoginButton = ({ modalOpen=false, setModalOpen }: any) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordShown, setPasswordShown] = useState(false) 
  const [buttonLoading, setButtonLoading] = useState(false)
  const [disableLogin, setDisableLogin] = useState(true)
  const { authenticateWithPassword } = useAuthentication()
  const [signUpModalOpen, setSignUpModalOpen] = useState(false)
  
  const handleClose = () => {
    setModalOpen(false)
  }
  
  
  const handleUsernameChange = (event: any) => {
    setUsername(event.target.value)
  }
  
  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value)
  }

  const handleShowPassword = () => {
    setPasswordShown(!passwordShown)
  }
  
  const handleLogin = async () => {
    setButtonLoading(true)
    try{
      const data = {
        username: username,
        password: password
      }
      await authenticateWithPassword(data)
    } catch (err) {
      console.log(err)
    }
    setButtonLoading(false)
  }

  useEffect(() => {
    if (username && username !== '' && password && password !== '') {
      setDisableLogin(false)
    } else {
      setDisableLogin(true)
    }
  }, [username, password])
  
  return (
    <>
      <Button
        onClick={() => setModalOpen(true)}
        sx={{
          color: '#FFF',
          paddingTop: 2,
          paddingBottom: 2,
          paddingLeft: 3,
          paddingRight: 3,
          borderRadius: '8px',
          border: '1px solid rgb(27, 49, 255)',
          borderBottomRightRadius: 0,
          borderTopRightRadius: 0,
          cursor: 'pointer',
          fontFamily: 'Sansation',
          fontSize: '1.25rem',
          lineHeight: '1.25rem',
          fontWeight: 700,
          marginLeft: 2,
        }}
      >
        Login
      </Button>
      <MyModal open={modalOpen} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '556px',
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            border: '1px solid #103187',
            borderRadius: '10px',
            p: '2.7rem',
          }}
        >
          <IconButton
            aria-label="delete"
            size="small"
            sx={{
              color: '#fff',
              padding: '0',
              position: 'absolute',
              right: '2.7rem',
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            id="modal-modal-title"
            variant="h1"
            color="#fff"
            fontSize="24px"
            fontWeight="500"
            style={{ textTransform: 'uppercase' }}
          >
            Login
          </Typography>
          <Grid marginTop={4}>
            <LoginInfoTextField 
              value={username}
              onChange={handleUsernameChange}
              placeholder={'Username'}  
              sx={{
                background: 'rgba(27, 49, 255, 0.2)'
              }}
            />
          </Grid>
          <Grid marginTop={3}>
            <LoginInfoTextField 
              value={password}
              type={ passwordShown ? 'text' : 'password'}
              onChange={handlePasswordChange}
              placeholder={'Password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position={'end'}>
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowPassword}
                      edge="end"
                    >
                      { passwordShown 
                        ? <VisibilityOff sx={{ color: '#FFFFFF'}}/> 
                        : <Visibility sx={{ color: '#FFFFFF'}}/> }
                    </IconButton>
                  </InputAdornment>
                )
              }}>
            </LoginInfoTextField>
          </Grid>
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 4
            }}
          >
            <SignUpButton modalOpen={signUpModalOpen} setModalOpen={setSignUpModalOpen}/>
            <LoadingButton
              onClick={handleLogin}
              variant="contained"
              disabled={disableLogin}
              loading={buttonLoading}
              sx={{
                width: '191px',
                height: '66px',
                background: `linear-gradient(180deg, #1B31FF 0%, #1427D3 100%)`,
                textShadow: `0px 4px 4px rgba(0, 0, 0, 0.25)`,
                color: '#FFF',
                paddingTop: 2,
                paddingBottom: 2,
                paddingLeft: 3,
                paddingRight: 3,
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: 'Sansation',
                fontSize: '1.25rem',
                lineHeight: '1.25rem',
                fontWeight: 700,
                marginLeft: 2,
                '&:disabled': {
                  color: 'rgba(255,255,255,0.75)',
                  boxShadow: 'none',
                  background: 'rgb(56 56 56)',
                }
              }}
            >
              Login
            </LoadingButton>
          </Grid>
        </Box>
      </MyModal>
    </>
  );
};

const LoginInfoTextField = styled(TextField)({
  width: '100%',
  marginRight: 24,
  border: '1px solid rgba(1, 141, 253, 0.2)',
  borderRadius: '10px',
  '& .MuiInputBase-input': {
    fontSize: 15,
    fontWeight: 500,
    color: 'rgba(255, 255, 255, 0.5)',
    padding: '1.2rem 2rem',
  },
  '& .Mui-disabled': {
    color: '#fff'
  },
  '& .Mui-focused': {
    border: '#fff!important',
  },
});