import { Outlet } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import { SideNavBar } from '@components/atomic/organisms';

export const Dashboard = () => (
  <Stack
    sx={{
      flexDirection: 'row',
      height: '100dvh',
      overflow: 'hidden',
      padding: 1.5,
    }}
  >
    <Stack
      sx={{
        width: 'fit-content',
        display: { xs: 'none', md: 'flex' },
      }}
    >
      <SideNavBar />
    </Stack>
    <Stack
      sx={{
        flex: 1,
        overflow: 'hidden',
      }}
    >
      <Stack
        sx={{
          flex: 1,
          maxHeight: 'calc(100dvh - 60px)',
          overflow: 'hidden',
          paddingLeft: { xs: 0, md: 1.5 },
          paddingBottom: 1.5,
        }}
      >
        <Stack
          sx={{
            padding: '1rem',
            backgroundColor: (theme) => theme.palette.background.paper,
            borderRadius: 1,
            height: '100%',
            maxHeight: '100%',
            overflow: 'auto',
          }}
        >
          <Outlet />
        </Stack>
      </Stack>
      <Stack
        sx={{
          height: 60,
          paddingLeft: { xs: 0, md: 1.5 },
        }}
      >
        <Stack
          sx={{
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: (theme) => theme.palette.background.paper,
            borderRadius: 1,
          }}
        >
          <Typography>PLAYER</Typography>
        </Stack>
      </Stack>
    </Stack>
  </Stack>
);
