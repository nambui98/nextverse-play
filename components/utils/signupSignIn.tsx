import { useEffect, useState } from 'react';
import { Button, Fade, Grid, IconButton, InputAdornment, Link, Stack, styled, TextField, Typography } from '@mui/material';
import { MyModal } from './modal';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import AuthenticationService from '../../services/authentication.service';
import { useAuthentication } from '../../contexts/AuthenticationContext';
import PasswordStrengthBar from 'react-password-strength-bar';
import { LoadingButtonPrimary, SignButton } from 'components/common/button';

export const SignUpSignInButton = ({ modalOpen = false, setModalOpen, big }: any) => {
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
  const [activeModal, setActiveModal] = useState<string>('');
  const { walletAddress } = useAuthentication();

  const handleClose = () => {
    setActiveModal('');
  };

  const handleUsernameChange = (event: any) => {
    setUsername(event.target.value)
  }

  const handleUserNameKeyPress = (event: any) => {
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
    try {
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
    } catch (err: any) { }
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
      <SignButton onClick={() => setActiveModal("signup")} sx={{ margin: "0 auto", marginTop: "16px" }}>
        <Typography
          color="inherit"
          textTransform={"uppercase"}
          variant="h5">
          Sign UP/ SIGN IN
        </Typography>

      </SignButton>

      <MyModal open={activeModal === "signup"} onClose={handleClose}>
        <Fade in={activeModal === "signup"}>
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
                maxWidth: '544px',
                bgcolor: '#fff',
                borderRadius: '16px',
                p: '40px',
                fontFamily: 'Josefin Sans',
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
                color="text.primary"
                fontFamily='Josefin Sans'
                fontSize="24px"
                fontWeight="500"
                lineHeight={1}
                style={{ textTransform: 'uppercase' }}
              >
                Sign up
              </Typography>
              <Grid marginTop={"43px"}>
                <SignUpTextField
                  error={!!usernameErrorMessage}
                  value={username}
                  onChange={handleUsernameChange}
                  onKeyPress={handleUserNameKeyPress}
                  placeholder={'Username'}
                  helperText={usernameErrorMessage}
                />
                {/* {usernameErrorMessage && (
                  <Typography paddingTop={"0.2rem"}>
                    {usernameErrorMessage}
                  </Typography>
                )} */}
              </Grid>
              <Grid marginTop={2}>
                <SignUpTextField
                  error={!!passwordErrorMessage}
                  value={password}
                  type={passwordShown ? 'text' : 'password'}
                  onChange={handlePasswordChange}
                  placeholder={'Password'}
                  helperText={passwordErrorMessage}
                // InputProps={{
                //   endAdornment: (
                //     <InputAdornment position={'end'}>
                //       <IconButton
                //         aria-label="toggle password visibility"
                //         onClick={handleShowPassword}
                //         edge="end"
                //       >
                //         {passwordShown
                //           ? <VisibilityOff sx={{ color: '#FFFFFF' }} />
                //           : <Visibility sx={{ color: '#FFFFFF' }} />}
                //       </IconButton>
                //     </InputAdornment>
                //   )
                // }}
                >
                </SignUpTextField>
                {/* <PasswordStrengthBar
                  password={password}
                  scoreWords={[]}
                  shortScoreWord={null}
                  style={{
                    paddingTop: '0.4rem',
                    paddingLeft: '0.2rem'
                  }}
                  minLength={8}
                />
                {passwordErrorMessage && (
                  <Typography>
                    {passwordErrorMessage}
                  </Typography>
                )} */}
              </Grid>
              <Grid marginTop={2}>
                {password ?
                  <SignUpTextField
                    error={!!passwordConfirmErrorMessage}
                    value={confirmPassword}
                    type={confirmPasswordShown ? 'text' : 'password'}
                    onChange={handleConfirmPasswordChange}
                    placeholder={'Confirm Password'}
                    helperText={passwordConfirmErrorMessage}
                  >
                  </SignUpTextField>
                  : <Box height={"58px"} />
                }
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
                  marginTop: 3
                }}
              >
                <LoadingButtonPrimary
                  disabled={disableSignUp}
                  loading={buttonLoading}
                  onClick={handleSignUp}
                  className='active'
                  sx={{ width: "100%", height: "64px" }}>
                  <Typography
                    fontFamily='Josefin Sans'
                    fontSize="18px"
                    fontWeight="600"
                    textTransform='uppercase'
                  >
                    Sign up Now
                  </Typography>
                </LoadingButtonPrimary>
                {/* <LoadingButton
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
                </LoadingButton> */}
              </Grid>
              <Grid
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: 5
                }}
              >
                <Typography
                  fontFamily='Josefin Sans'
                  fontSize="18px"
                  fontWeight="600"
                  textTransform='none'
                >
                  Already have account? <span style={{
                    color: "#FB2F8A", fontFamily: 'Josefin Sans',
                    fontSize: "18px",
                    fontWeight: "600",
                    textTransform: 'none',
                    borderBottom: "1px solid #FB2F8A",
                    cursor: "pointer"

                  }}>Sign in</span>
                </Typography>
              </Grid>
            </Box>
          </Grid>

        </Fade>
      </MyModal>
    </>
  );
};

const SignUpTextField = styled(TextField)({
  width: '100%',
  marginRight: 24,
  border: 'none',
  '& .MuiInputBase-input': {
    fontSize: 18,
    fontWeight: 400,
    color: '#31373E',
    background: '#E9EAEF',
    borderRadius: '8px',

    padding: '15px 24px',
    lineHeight: 1,
    fontFamily: 'Josefin Sans',

  },
  '& .Mui-disabled': {
    color: '#A7ACB8'
  },
  '& .Mui-focused': {
    border: '#fff!important',
  },
  '.MuiOutlinedInput-notchedOutline': {
    border: 'none'
  },
  '.MuiFormHelperText-root.Mui-error ': {
    marginLeft: 'auto',
    marginTop: "8px",
    color: "#FF1B1B",
    fontSize: "14px",
    fontWeight: "500",
    fontFamily: 'Josefin Sans'
  },
  '.MuiInputBase-root.Mui-error .MuiInputBase-input': {
    border: '1px solid #FF1B1B'
  }
});
