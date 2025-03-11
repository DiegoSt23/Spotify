import { Tabs, Tab } from '@mui/material';

interface ResultsTabsProps {
  currentTab: number;
  handleSelectTab: (val: number) => void;
  data: string[];
}

export const ResultsTabs = ({
  currentTab,
  handleSelectTab,
  data,
}: ResultsTabsProps) => (
  <Tabs
    value={currentTab}
    onChange={(_, val) => handleSelectTab(val)}
    variant='standard'
    TabIndicatorProps={{
      sx: {
        height: 35,
        borderRadius: 1.2,
        zIndex: 1,
        backgroundColor: (theme) => theme.palette.action.selected,
      },
    }}
  >
    {data?.map((tab, index) => (
      <Tab
        key={tab}
        label={tab}
        value={index}
        sx={{
          padding: 0,
          minHeight: 35,
          height: 35,
          zIndex: 2,
          borderRadius: 1,
          textTransform: 'capitalize',
          '&.Mui-selected': {
            color: (theme) =>
              theme.palette.getContrastText(theme.palette.background.paper),
          },
        }}
        disableRipple
        tabIndex={0}
      />
    ))}
  </Tabs>
);
