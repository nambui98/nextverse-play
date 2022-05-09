import { useEffect, useState } from 'react';
import { Button, Grid, IconButton, InputAdornment, Link, Stack, styled, TextField, Typography } from '@mui/material';
import { MyModal } from './modal';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import AuthenticationService from '../../services/authentication.service';
import { useAuthentication } from '../../contexts/AuthenticationContext';
import PasswordStrengthBar from 'react-password-strength-bar';

export const SignUpButton = ({ modalOpen=false, setModalOpen, big }: any) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordShown, setPasswordShown] = useState(false)
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [disableSignUp, setDisableSignUp] = useState(true)
  const [usernameErrorMessage, setUsernameErrorMessage] = useState<any>(null)
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<any>(null)
  const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] = useState<any>(null)
  const { walletAddress } = useAuthentication();

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleUsernameChange = (event: any) => {
    setUsername(event.target.value)
  }

  const handleUserNameKeyPress = (event:any) => {
    if (!/[a-z\_\-]/.test(event.key)) {
      event.preventDefault()
    }
  }

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value)
  }
  const handleConfirmPasswordChange = (event: any) => {
    setConfirmPassword(event.target.value)
  }

  const handleShowPassword = () => {
    setPasswordShown(!passwordShown)
  }
  
  const handleShowConfirmPassword = () => {
    setConfirmPasswordShown(!confirmPasswordShown)
  }
  
  const handleSignUp = async () => {
    setButtonLoading(true)
    try{
      const data = {
        username: username,
        password: password
      }
      if (walletAddress) {
        await AuthenticationService.addUserToExistingAccount(data)
      } else {
        await AuthenticationService.register(data)
      }
      handleClose()
    } catch (err: any) {}
    setButtonLoading(false)
  }
  
  useEffect(() => {
    if (username.length < 8) {
      setUsernameErrorMessage("Username must contain at least 8 characters and only _ and -")
    } else if (username.length > 16) {
      setUsernameErrorMessage("Username must contain less then 16 characters")
    } else {
      setUsernameErrorMessage(null)
    }

    if (password.length < 8) {
      setPasswordErrorMessage("Password must contain at least 8 characters")
    } else if (password.length > 128) {
      setPasswordErrorMessage("Password must contain less then 128 characters")
    } else {
      setPasswordErrorMessage(null)
    }
    
    if (password !== confirmPassword) {
      setPasswordConfirmErrorMessage("Confirm password is not matched")
    } else {
      setPasswordConfirmErrorMessage(null)
    }
    
    if (username && username.length >= 8 && password.length > 8 && password === confirmPassword) {
      setDisableSignUp(false)
    } else {
      setDisableSignUp(true)
    }
  }, [username, password, confirmPassword])
  
  return (
    <>
      <Button
        onClick={() => setModalOpen(true)}
        sx={{
          width: big ? '133px' : '191px',
          height: big ? '47px' : '66px',
          border: '1px solid #1B31FF',
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
          marginLeft: big ? 0 : 2
        }}
      >
        Sign up
      </Button>
      <MyModal open={modalOpen} onClose={handleClose}>
        <Grid sx={{
          background: 'red'
        }}>
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
              Sign up
            </Typography>
            <Grid marginTop={4}>
              <SignUpTextField
                value={username}
                onChange={handleUsernameChange}
                onKeyPress={handleUserNameKeyPress}
                placeholder={'Username'}
                sx={{
                  background: 'rgba(27, 49, 255, 0.2)'
                }}
              />
              { usernameErrorMessage && (
                <Typography paddingTop={"0.2rem"}>
                  {usernameErrorMessage}
                </Typography>
              )}
            </Grid>
            <Grid marginTop={3}>
              <SignUpTextField
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
              </SignUpTextField>
              <PasswordStrengthBar 
                password={password}
                scoreWords={[]}
                shortScoreWord={null}
                style={{
                  paddingTop: '0.4rem',
                  paddingLeft: '0.2rem'
                }}
                minLength={8}
              />
              { passwordErrorMessage && (
                <Typography>
                  {passwordErrorMessage}
                </Typography>
              )}
            </Grid>
            <Grid marginTop={3}>
              <SignUpTextField
                value={confirmPassword}
                type={ confirmPasswordShown ? 'text' : 'password'}
                onChange={handleConfirmPasswordChange}
                placeholder={'Confirm Password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position={'end'}>
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowConfirmPassword}
                        edge="end"
                      >
                        { confirmPasswordShown
                          ? <VisibilityOff sx={{ color: '#FFFFFF'}}/>
                          : <Visibility sx={{ color: '#FFFFFF'}}/> }
                      </IconButton>
                    </InputAdornment>
                  )
                }}>
              </SignUpTextField>
              { passwordConfirmErrorMessage && (
                <Typography paddingTop={'0.2rem'}>
                  {passwordConfirmErrorMessage}
                </Typography>
              )}
            </Grid>
            <Grid sx={{
              marginTop: 3,
              fontStyle: 'normal',
              fontWeight: 'normal',
              fontSize: '16px',
              lineHeight: '24px',
            }}>
              Credentials are used to play in mobile app. You still need your wallet to trade NFT items.
            </Grid>
            <Grid
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 4
              }}
            >
              <LoadingButton
                onClick={handleSignUp}
                variant="contained"
                disabled={disableSignUp}
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
                Signup Now
              </LoadingButton>
            </Grid>
          </Box>
        </Grid>
      </MyModal>
    </>
  );
};

const SignUpTextField = styled(TextField)({
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
