import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { SxProps } from '@mui/system';
import { Box, Grid, Theme } from '@mui/material';
import { CharacterModel } from './utils/characterModel';

export const CharacterPreview = ({ children, modelSkeleton, selectedItems }: any) => {
  const characterPreviewStyle: SxProps<Theme> = {
    height: '630px',
    width: '430px',
  }

  return <>
    <Grid sx={characterPreviewStyle}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 60 }}>
        <ambientLight intensity={1} />
        <ambientLight intensity={0.7} />

        <Suspense fallback={null}>
          <CharacterModel model={modelSkeleton} />
        </Suspense>

        { selectedItems.map((item: any, idx: any) => item && (
          <Suspense key={idx} fallback={null}>
            <CharacterModel model={item} />
          </Suspense>
        ))}
      </Canvas>
      {children}
    </Grid>
  </>
}