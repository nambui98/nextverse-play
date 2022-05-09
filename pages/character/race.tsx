import type { NextPage } from 'next';
import { Layout } from 'components/layout'
import { Box, SxProps } from '@mui/system';
import { PageTitle } from 'components/utils/pageTitle';
import { Button, Grid, Theme } from '@mui/material';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { ContextType, useRef, useState } from 'react';
import RaceSample from 'public/images/race-sample.png'
import Image from "next/image"
import { NextPageButton, PrevPageButton } from '../../components/utils/pagination';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

type scrollVisibilityApiType = ContextType<typeof VisibilityContext>

const genderTab = ['male', 'female', 'other']

const Page: NextPage = () => {
	const [raceOptions, setRaceOptions] = useState(staticData(genderTab[0]));
	const [gender, setGender] = useState(genderTab[0])
	
	const raceMenuRef = useRef({} as scrollVisibilityApiType)
	const scrollLeft = () => {
		raceMenuRef.current.scrollPrev()
	}
	const scrollRight = () => {
		raceMenuRef.current.scrollNext()
	}
	
	const handleGenderChange = (newGender: string) => {
		setGender(newGender)
		raceMenuRef.current.scrollToItem(raceMenuRef.current.getItemById('0'))
		setRaceOptions(staticData(newGender))
	}

	const scrollMenuStyle: SxProps<Theme> = {
		width: 'inherit',
		['.react-horizontal-scrolling-menu--wrapper ::-webkit-scrollbar']: {
			display: 'none'
		},
		['.react-horizontal-scrolling-menu--wrapper']: {
			flexWrap: 'wrap',
			justifyContent: 'flex-end'
		},
		['.react-horizontal-scrolling-menu--scroll-container']: {
			scrollbarWidth: 'none',
			msOverflowStyle: 'none',
			order: 1,
			flexBasis: '100%',
			flexShrink: 0
		},
	}
	
	return <Layout>
    <Box sx={{
      padding: 3
    }}>
      <Grid container sx={{
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      >
        <Grid item sx={{ padding: '0.7rem 1.4rem' }}>
          <PageTitle>Pick your race</PageTitle>
        </Grid>
        <Grid item sx={{ 
          display: 'flex',
          padding: '1.1rem 0.67rem',
          marginLeft: -2,
          '@media(max-width: 1251px)': {
            paddingTop: 0
          }
        }}>
          <Box sx={{ marginRight: 2 }}>
            {genderTab.map((tab: any, id: number) => (
              <GenderTab 
                key={id}
                gender={tab}
                selectedGender={gender}
                handleGenderChange={() => handleGenderChange(tab)}
              >
                {tab}
              </GenderTab>
            ))}
          </Box>
          <Box onClick={scrollLeft}>
            <PrevPageButton />
          </Box>
          <Box onClick={scrollRight}>
            <NextPageButton />
          </Box>
        </Grid>
      </Grid>
      <Grid container sx={{
        paddingTop: 3,
        paddingLeft: 2
      }}>
        <Grid sx={scrollMenuStyle}>
          <ScrollMenu apiRef={raceMenuRef}>
            {raceOptions.map(race => (
              <Race
                key={race.id}
                itemId={race.id}
                img={race.img}
              />
            ))}
          </ScrollMenu>
        </Grid>
      </Grid>
  </Box>
  </Layout >
}

export default Page;

const GenderTab = ({ children, gender, selectedGender, handleGenderChange }: any) => {
	return (
		<Button onClick={handleGenderChange} sx={{
			fontStyle: 'normal',
			fontWeight: 500,
			fontSize: '24px',
			lineHeight: '30px',
			textTransform: 'uppercase',
			color: (gender === selectedGender) ? '#FFFFFF' : `rgba(255, 255, 255, 0.3)`,
			padding: '0.8rem 2rem'
		}}>
			{children}
		</Button>
	)
}

const Race = ({ itemId, img }: any) => {
	const [race, setRace] = useCookies(['race'])
	const router = useRouter()

	const handlePickRace = () => {
		setRace('race', itemId)
		setTimeout(() => { router.push('/character') }, 0)
	}

	return (
		<Grid>
			<Button onClick={handlePickRace} sx={{
				background: `rgba(3, 5, 27, 0.3)`,
				border: `1px solid rgba(255, 255, 255, 0.2)`,
				width: '400px',
				height: '736px',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				marginRight: 4,
				'&:hover': {
					backgroundColor: `rgba(27, 49, 248, 0.2)`
				}
			}}>
				<Image
					src={img.src}
					alt={img}
					width={img.width}
					height={img.height}
				/>
				<Grid sx={{ marginTop: 4}}>
					<Grid sx={{
						fontWeight: '500',
						fontSize: '24px',
						lineHeight: '30px',
						textTransform: 'uppercase',
						color: `rgba(255, 255, 255, 0.4)`
					}}>
						RANK
					</Grid>
					<Grid sx={{
						fontWeight: '600',
						fontSize: '48px',
						lineHeight: '61px',
						textTransform: 'uppercase',
						color: '#FFFFFF',
						paddingTop: 1,
					}}>
						{itemId + 1}
					</Grid>
				</Grid>
			</Button>
		</Grid>
	);
}

function staticData(gender: string) {
	let len
	if (gender === 'male') {
		len = 10
	} else if (gender === 'female') {
		len = 3
	} else {
		len = 1
	}
	
	return Array.from(Array(len).keys())
		.map(key => ({
			id: key,
			img: RaceSample
		}))
}