import type { NextPage } from 'next';
import { Layout } from 'components/layout'
import dynamic from 'next/dynamic'
import { Grid } from '@mui/material';
import { LandSideBar } from '../components/land/landSideBar';
import { Box } from '@mui/system';

const DynamicComponent = dynamic(
  () => import('../components/land/landDemo'),
  { ssr: false }
)


const Page: NextPage = () => {
  return (
    <Layout>
      <Grid>
        <LandSideBar />
        <Box position={'absolute'}>
          <DynamicComponent />
        </Box>
      </Grid>
    </Layout>
  )
}

export default Page;