import type { NextPage } from 'next';
import { Layout } from 'components/layout'
import { Box} from '@mui/system';
import { Grid} from '@mui/material';
import { PageTitle } from '../components/utils/pageTitle';
import SampleAsset from 'public/images/leaderboad-asset.png';
import { LeaderboardItem } from '../components/leaderboardItem';

const Page: NextPage = () => {
  const leaderboardDatas = getLeaderboardData()
  return <Layout>
    <Box sx={{
      padding: 3
    }}>
      <Grid>
        <Grid item sx={{ padding: '0.7rem 1.4rem' }}>
          <PageTitle>Assets Leaderboard</PageTitle>
        </Grid>
        <Grid sx={{
          paddingTop: 1,
          paddingBottom: 1,
          paddingLeft: 2,
          paddingRight: 2
        }}>
          {leaderboardDatas.map((leaderboard: any, idx: any) => (
            <LeaderboardItem
              key={idx}
              data={leaderboard}
            />
          ))
          }
        </Grid>
      </Grid>
    </Box>
  </Layout>
}

function getLeaderboardData() {
  return Array.from(Array(10).keys())
    .map(key => ({
      id: key,
      img: SampleAsset,
      address: '789342tygb9w45tyh8o231rt3',
      amount: '9999999999999',
      totalValue: '42123121.2',
    }))
}

export default Page;