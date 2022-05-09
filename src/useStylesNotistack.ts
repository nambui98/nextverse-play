import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  Info: {
    borderColor: '#1b31fe',
    border: '#1B31FF 1px solid',
  },
  Success: {
    borderColor: '#00fd57',
    border: '#00FF57 1px solid',
  },
  Error: {
    borderColor: '#fd2a3a',
    border: '#FF2A3A 1px solid',
  },
  Warning: {
    borderColor: '#fd8f2a',
    border: '#FF902A 1px solid',
  },
  Root: {
    '&.SnackbarContent-root': {
      flexWrap: 'nowrap',
      background: 'rgb(0 0 0 / 50%)!important',
      width: '540px',
      height: '163px',
      padding: '0 0.7rem',
      borderRadius: '10px!important',
      backdropFilter: 'blur(40px)',
      '&.SnackbarItem-action': {
        padding: 0
      }
    }
  }
})
export default useStyles;