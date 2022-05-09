import { NextPage } from "next"
import { Layout } from "../../components/layout"
import { SxProps } from "@mui/system"
import { PageTitle } from "../../components/utils/pageTitle"
import { Box, Button, Grid, Theme } from "@mui/material"
import { useState, useEffect } from "react"
import { CharacterTab } from "../../components/characterTab"
import { useCookies } from "react-cookie"
import { useRouter } from 'next/router';
import { CharacterPreview } from '../../components/characterPreview';

const SELECTED_RACE_STORAGE_KEY = 'race'

const SELECTED_BODY_PART_STORAGE_KEY = 'selectedBodyParts'

interface Map {
	[key: string]: any
}

const sampleModelSkeleton = { modelPath: '/male_body.glb', modelName: 'male_body'}

const bodyPartsOptions: Map = {
	ears: [
    { modelPath: '/quan.glb', modelName: 'quan'},
    { modelPath: '/pant.glb', modelName: 'pant'},
  ],
	eyes: [
    { modelPath: '/ao.glb', modelName: 'ao'},
    { modelPath: '/hoodie.glb', modelName: 'hoddie'},
  ],
	hair: [],
	nose: [],
	mouse: []
}

const Page: NextPage = () => {
	const router = useRouter()
	const [cookies, setCookie] = useCookies([SELECTED_BODY_PART_STORAGE_KEY, SELECTED_RACE_STORAGE_KEY])
  const [modelSkeleton, setModelSkeleton] = useState(sampleModelSkeleton)
	
	const [selectedBodyParts, setSelectedBodyParts] = useState({})

	useEffect(() => {
    // Load race picked and set model skeleton. Add later when get full design
		if (!cookies[SELECTED_RACE_STORAGE_KEY]) {
			setTimeout(() => { router.push('/character/race') }, 0)
		}
		let draftBodyParts = JSON.parse(localStorage.getItem(SELECTED_BODY_PART_STORAGE_KEY) || '{}')
		if (Object.keys(draftBodyParts).length === 0) {
			Object.keys(bodyPartsOptions).map(bodyPart => {
				draftBodyParts[bodyPart] = bodyPartsOptions[bodyPart][0]
			})
		}
		setSelectedBodyParts(draftBodyParts)
	}, [])
	
	const handleBodyPartChange = (newPart: any, key: string) => {
		let updatedPart: Map = { ...selectedBodyParts }
		updatedPart[key] = newPart
		localStorage.setItem(SELECTED_BODY_PART_STORAGE_KEY, JSON.stringify(updatedPart))
		setSelectedBodyParts(updatedPart)
	}
	
	const handleCancelCharacteristic = () => {
		setTimeout(() => { router.push('/character/race') }, 0)
	}
	const handleConfirmCharacteristic = () => {
		setCookie(SELECTED_BODY_PART_STORAGE_KEY, selectedBodyParts)
	}
	
	const characterPickerStyle: SxProps<Theme> = {
		maxWidth: '1526px',
		margin: 5,
		padding: 6,
		boxSizing: `border-box`,
		background: `rgba(255, 255, 255, 0.06)`,
		borderColor: '#25235d',
		borderStyle: 'solid',
		borderWidth: '1px'
	}
	
	const cancelButtonStyle: SxProps<Theme> = {
		height: '66px',
		width: '150px',
		color: '#FFF',
		marginLeft: 2,
		marginRight: 2,
		borderRadius: '8px',
		border: `2px solid rgba(255, 255, 255, 0.2)`,
		fontFamily: 'Sansation',
		fontStyle: 'normal',
		fontSize: '18px',
		fontWeight: 'bold'
	}

	const confirmButtonStyle: SxProps<Theme> = {
		background: `linear-gradient(180deg, #1B31FF 0%, #1427D3 100%)`,
		height: '66px',
		width: '175px',
		color: '#FFF',
		marginLeft: 2,
		borderRadius: '8px',
		fontFamily: 'Sansation',
		fontStyle: 'normal',
		fontSize: '18px',
		fontWeight: 'bold'
	}

	return <Layout>
		<Grid sx={characterPickerStyle}>
			<PageTitle>Create Your Character</PageTitle>
			<Grid container sx={{
				width: 'auto',
				['@media (min-width: 1585px)'] : {
					flexWrap: 'nowrap'
			}}}>
				<Box sx={{ marginTop: 6 }} >
          <CharacterPreview
            modelSkeleton={modelSkeleton}
            selectedItems={Object.values(selectedBodyParts)}
          />
				</Box>
				<Grid container sx={{
					marginLeft: 6,
					marginTop: 6,
					['@media (max-width: 1584px)'] : {
						marginLeft: 0
					}
				}}>
					<Grid container sx={{ alignContent: 'flex-start' }}>
						<CharacterTab 
							handleBodyPartChange={handleBodyPartChange} 
							selectedBodyParts={selectedBodyParts}
							bodyPartsOptions={bodyPartsOptions}
						/>
					</Grid>
					<Grid item sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						alignItems: 'flex-end',
						bottom: 0,
						marginTop: 10,
						width: '100%',
					}}>
						<Button onClick={handleCancelCharacteristic} sx={cancelButtonStyle}>Cancel</Button>
						<Button onClick={handleConfirmCharacteristic} sx={confirmButtonStyle}>Complete</Button>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	</Layout >
}

export default Page;
