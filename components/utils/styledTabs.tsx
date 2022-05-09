import { styled, Tab, Tabs } from '@mui/material';

interface StyledTabsProps {
  children?: any;
  value: string;
  onChange: (event: any, newValue: any) => void;
}

export const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: '3px'
  },
  '& .MuiTabs-flexContainer': {
    display: 'flex',
    flexWrap: 'wrap'
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 60,
    width: '100%',
    backgroundColor: '#1B31FF'
  },
});

interface StyledTabProps {
  label: string
  value: string
}

export const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(() => ({
  textTransform: 'uppercase',
  fontFamily: 'Rajdhani',
  fontWeight: '500',
  fontSize: '24px',
  fontStyle: 'normal',
  margin: '0 0.9rem 0',
  padding: '0 1.25rem 2rem',
  color: 'rgba(255, 255, 255, 0.6)',
  '&.Mui-selected': {
    color: '#fff',
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
  [':last-child']: {
    marginRight: 0,
    paddingRight: 0
  },
  ['@media (min-width: 1585px)']: {
    justifyContent: 'flex-start',
  },
  ['@media (max-width: 1054px)']: {
    marginRight: 0
  }
}))

