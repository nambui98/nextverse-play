import { Button, ImageListItem, ImageListItemBar } from '@mui/material';

export const InventoryItem = ({ data, appliedItems, handleSellItem, handleApplyItem }: any) => {
  return (
    <ImageListItem sx={{
      border: 'solid 2px',
      borderColor: appliedItems.includes(data) ? '#1B31FF' : 'rgba(255, 255, 255, 0.2)',
    }}>
      <img
        onClick={() => handleApplyItem(data)}
        src={data.image}
        srcSet={data.image}
        alt={data.image}
        loading="lazy"
        style={{ cursor: 'pointer' }}
      />
      <ImageListItemBar
        position="bottom"
        title={
          <div style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '14px',
                lineHeight: '17px',
                textTransform: 'uppercase',
                color: '#FFFFFF',
              }}>{data.name}</div>
              <div style={{
                fontFamily: 'Euclid Circular B',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '10px',
                lineHeight: '12px',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                textAlignLast: 'left'
              }}>Quantity: {data.quantity}</div>
            </div>
            <Button onClick={() => handleSellItem(data)} sx={{
              background: 'rgba(255,0,0,0.83)',
              color: 'white',
              '&:hover': {
                background: 'rgb(255,0,0)'
              }
            }}>
              Sell now
            </Button>
          </div>
        }
        sx={{
          background: 'rgba(28, 24, 35, 0.8)',
          boxShadow: '0px 4px 41px rgba(0, 0, 0, 0.5)',
          textAlign: 'center',
          padding: '.4rem',
          backdropFilter: 'blur(8px)',
        }}
      />
    </ImageListItem>
  );
}
