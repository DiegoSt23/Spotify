import { Outlet } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import { SideNavBar } from '@components/atomic/organisms';

export const Dashboard = () => (
  <Stack sx={{ flexDirection: 'row', height: '100dvh', overflow: 'hidden' }}>
    <Stack
      sx={{
        width: 'fit-content',
        borderRight: (theme) => `1px solid ${theme.palette.divider}`,
        display: { xs: 'none', md: 'flex' },
      }}
    >
      <SideNavBar />
    </Stack>
    <Stack
      sx={{
        flex: 1,
        height: '100dvh',
        overflow: 'hidden',
      }}
    >
      <Stack
        sx={{
          flex: 1,
          padding: { xs: '1rem', md: '1rem 3rem' },
          maxHeight: 'calc(100dvh - 80px)',
          overflow: 'auto',
        }}
      >
        <Outlet />
      </Stack>
      <Stack
        sx={{
          height: 80,
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography>PLAYER</Typography>
      </Stack>
    </Stack>
  </Stack>
);
