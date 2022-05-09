import { Box } from '@mui/system'
import { makeStyles } from '@mui/styles';
import { Modal, Typography, Fade, Backdrop } from '@mui/material'
import { useState } from 'react';

const useStyles = makeStyles({
  Backdrop: {
    background: "rgba(28, 26, 50, 0.5)",
    backdropFilter: "blur(26px)",
  }
});

export const MyModal = (props: any) => {
  const classes = useStyles();

  return <Modal
    {...props}
    BackdropComponent={Backdrop}
    closeAfterTransition
    BackdropProps={{
      timeout: 250,
      className: classes.Backdrop,
    }}
  >
    {/* <Fade in={props.open}> */}
    {/* <Box sx={{
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
			}}> */}
    {props.children}
    {/* </Box> */}
    {/* </Fade> */}
  </Modal>
}

export const ModalTitle = ({ children }: any) => {
  return (
    <Typography
      variant="h1"
      sx={{
        color: '#fff',
        fontSize: 24,
        fontWeight: 500,
        textTransform: 'uppercase',
        marginBottom: '2.6rem'
      }}
    >{children}</Typography>
  );
}

export const ModalSubtitle = ({ children }: any) => {
  return (
    <Typography
      variant="h2"
      sx={{
        color: 'rgba(255, 255, 255, 0.4)',
        fontSize: 18,
        fontWeight: 500,
        textTransform: 'uppercase'
      }}
    >{children}</Typography>
  );
}

export const ModalContent = ({ children, text }: any) => {
  return (
    <Typography
      variant="h1"
      sx={{
        color: '#fff',
        fontSize: text ? 14 : 24,
        fontWeight: 500,
        textTransform: 'uppercase',
        marginBottom: '2.6rem'
      }}
    >{children}</Typography>
  );
}
