import { Typography } from '@mui/material'

export const PageTitle = ({ children }: any) => {
  return (
    <Typography
      variant="h1"
      color="#31373E"
      fontSize={32}
      fontWeight={600}
      sx={{ textTransform: 'none' }}
    >
      {children}
    </Typography>
  )
}