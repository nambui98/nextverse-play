import { TabContext } from "@mui/lab"
import { Box, SxProps } from "@mui/system"
import { ImageList, ImageListItem, ImageListItemBar, Theme } from "@mui/material"
import { useState } from "react"
import { StyledTabs, StyledTab } from './utils/styledTabs';

export function CharacterTab({ handleBodyPartChange, selectedBodyParts, bodyPartsOptions }: any) {
	const [tab, setTab] = useState(Object.keys(bodyPartsOptions)[0])

	const handleChangeTab = (event: any, newValue: string) => {
		setTab(newValue)
	}

	const chosenTabStyle: SxProps<Theme> = {
		color: '#FFFFFF',
		textAlign: 'center',
		background: '#1B31FF',
		'& .MuiImageListItemBar-titleWrapBottom': {
			padding: 0
		}
	}

	return <>
		<TabContext value={tab}>
			<Box sx={{ 
				width: '100%',
				boxShadow: 'inset 0 -3px 0 0 rgba(255, 255, 255, 0.1)',
			}}>
				<StyledTabs
					value={tab}
					onChange={handleChangeTab}
				>
					{Object.keys(bodyPartsOptions).map((title: string, idx: any) => (
						<StyledTab key={idx} label={title} value={title} />
					))}
				</StyledTabs>
			</Box>
			<ImageList
				cols={4}
				gap={24}
				sx={{
					width: '100%',
					margin: '2.7rem 0 0',
				}}
			>
				{bodyPartsOptions[tab].map((partOption: any, idx: number) => (
					<ImageListItem key={idx} onClick={() => handleBodyPartChange(partOption, tab)}>
						<img
							src={getPartOptionThumbnail(partOption)}
							alt={partOption}
							loading="lazy"
							style={{ 
								cursor: 'pointer',
								backgroundColor: '#03051b'
							}}
						/>
						{JSON.stringify(partOption) === JSON.stringify(selectedBodyParts[tab]) &&
							<ImageListItemBar
								position="bottom"
								title={
									<span style={{
										textTransform: 'uppercase',
										fontWeight: 500,
										fontSize: 16,
										lineHeight: '40px'
									}}>CHOSEN</span>
								}
								sx={chosenTabStyle}
							/>
						}
					</ImageListItem>
				))}
			</ImageList>
		</TabContext>
	</>
}

function getPartOptionThumbnail(partOption: any): string {
	let imagePath = '/images/character/'
	imagePath += (partOption.modelName + '.png')
	return imagePath
}