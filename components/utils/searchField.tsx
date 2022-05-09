import { InputAdornment, styled, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    paddingLeft: 26,
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      border: 'none',
    },
  },
  '& .MuiSvgIcon-root': {
    width: '1.5em',
    height: '1.5em',
    paddingRight: 26,
  },
  '& .MuiOutlinedInput-input': {
    fontFamily: 'Sansation',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '100%',
    color: '#FFFFFF !important',
    paddingTop: 20,
    paddingBottom: 20
  },
  '& ::placeholder': {
    textTransform: 'uppercase'
  },
  border: '2px solid rgba(255, 255, 255, 0.2)',
  boxSizing: 'border-box',
  borderRadius: '8px',
  width: '408px',
})

export const SearchField = ({ searchString, handleSearchItem }: any) => {
  return (<>
    <Search
      value={searchString}
      onChange={handleSearchItem}
      placeholder={"Search..."}
      InputProps={{
        endAdornment: (
          <InputAdornment position={'end'}>
            <SearchIcon sx={{ color: '#FFFFFF', cursor: 'pointer' }} />
          </InputAdornment>
        )
      }}>
    </Search>
  </>)
}