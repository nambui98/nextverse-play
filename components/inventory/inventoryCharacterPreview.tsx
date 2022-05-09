import { Box, Button, Grid } from '@mui/material';
import { CharacterPreview } from '../characterPreview';

const sampleModelSkeleton = { modelPath: '/male_body.glb', modelName: 'male_body'}

export const InventoryCharacterPreview = ({ selectedItems }: any) => {
  return (
    <Box sx={{
      marginTop: 4,
      marginLeft: 3,
      marginRight: 1,
      marginBottom: 3
    }} >
      <CharacterPreview
        modelSkeleton={sampleModelSkeleton}
        selectedItems={selectedItems}
      >
        { selectedItems.length > 0 && (
          <Grid sx={{
            justifyContent: 'center',
            display: 'flex',
            marginTop: -7
          }}>
            <Button sx={{
              background: 'rgba(0,24,255,0.84)',
              color: 'white',
              width: '110px',
              '&:hover': {
                background: 'rgb(0,25,255)'
              }
            }}>
              Save
            </Button>
          </Grid>
        )}
      </CharacterPreview>
    </Box>
  )
}

