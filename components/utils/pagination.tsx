import { Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export const NextPageButton = ({ onClick }: any) => {
	return (
		<PageButton onClick={onClick || function() {}}>
			<ArrowForwardIosIcon />
		</PageButton>
	);
};

export const PrevPageButton = ({ onClick }: any) => {
	return (
		<PageButton onClick={onClick || function() {}}>
			<ArrowBackIosNewIcon />
		</PageButton>
	);
};

function PageButton({ children, onClick }: any) {
	return (
		<Button
			variant="outlined"
			onClick={onClick}
			sx={{
				border: '1px solid rgba(255, 255, 255, 0.1)',
				borderRadius: '50%',
				width: '46px',
				height: '46px',
				minWidth: 'unset',
				padding: '1.42rem 1.67rem',
				margin: '0 0.67rem',
				color: '#fff',
				'&:hover': {
					backgroundColor: 'primary.main',
				},
			}}
		>
			{ children }
		</Button>
	);
}
