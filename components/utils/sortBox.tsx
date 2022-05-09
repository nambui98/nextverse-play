import { Fade, FormControl, InputBase, InputLabel, MenuItem, Select, styled, Typography } from '@mui/material';

const CustomInput = styled(InputBase)(() => ({
  'label + &': {
    color: '#FFFFFF!important',
  },
  border: '2px solid rgba(255, 255, 255, 0.2)',
  boxSizing: 'border-box',
  borderRadius: '8px',
  '& .MuiInputBase-input': {
    position: 'relative',
    fontSize: 21,
    padding: '10px 26px 10px 40px',
  },
  '& .MuiSvgIcon-root': {
    color: '#FFFFFF',
    marginRight: 24
  },
  '& .MuiSelect-select': {
    paddingTop: 24,
    paddingBottom:16,
    fontFamily: 'Sansation',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '100%',
    textTransform: 'uppercase',
  },
  '& .MuiList-root': {
    backgroundColor: 'rgba(0, 0, 0, 0.35)'
  },
  width: '331px'
}));

export const SortBox = ({ sortOption, handleSortChange, options }: any) => {
  return (<>
    <FormControl>
      <InputLabel focused={false} sx={{
        fontFamily: 'Sansation',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '18px',
        lineHeight: '100%',
        textTransform: 'uppercase',
        color: '#FFFFFF',
        backgroundColor: '#131224FF',
        marginLeft: 3,
        marginTop: 1
      }}>
        Sort by
      </InputLabel>
      <Select
        value={sortOption}
        input={<CustomInput />}
        onChange={handleSortChange}
        MenuProps={{
          TransitionComponent: Fade,
          sx: {
            '& .MuiMenu-list': {
              padding: 0,
              borderRadius: '4px',
              border: '2px solid rgba(255, 255, 255, 0.2)',
            },
          }
        }}
      >
        {options.map((data: any) => (
          <MenuItem
            key={data.value}
            value={data.value}
            sx={{
              background: '#7A7685',
              padding: '1.5rem 2.7rem 1.5rem 1.5rem',
              transition: 'all 0.1s',
              '&:hover': {
                background: '#6a6775',
              },
              '&.Mui-selected': {
                background: '#7A7685',
                ':hover': {
                  background: '#6a6775'
                }
              }
            }}
          >
            <Typography sx={{
              color: '#fff',
              fontSize: 16,
              width: '100%'
            }}>{data.text}</Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </>)
}
