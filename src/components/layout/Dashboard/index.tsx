import { Outlet } from 'react-router-dom';
import { Stack, Divider } from '@mui/material';
import { SideNavBar, MobileNavBar } from '@components/navigation';
import { Player } from '@components/player';
import { QueueListDrawer } from '@components/queue';

export const Dashboard = () => (
  <Stack
    sx={{
      height: '100dvh',
      overflow: 'hidden',
      padding: { xs: 0, sm: 1.5 },
    }}
  >
    <Stack
      sx={{
        flex: 1,
        flexDirection: 'row',
        overflow: 'hidden',
        paddingBottom: { xs: 0, sm: 1.5 },
      }}
    >
      {/* Side Nav Bar */}
      <Stack
        sx={{
          width: 'fit-content',
          display: { xs: 'none', md: 'flex' },
        }}
      >
        <SideNavBar />
      </Stack>
      {/* Main Content */}
      <Stack
        sx={{
          flex: 1,
          overflow: 'hidden',
          paddingLeft: { xs: 0, md: 1.5 },
        }}
      >
        <Stack
          sx={{
            padding: '0rem 1rem 1rem 1rem',
            backgroundColor: (theme) => theme.palette.background.paper,
            borderRadius: { xs: 0, sm: 1.5 },
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <Outlet />
        </Stack>
      </Stack>
    </Stack>
    <Stack>
      {/* Player */}
      <Divider sx={{ display: { xs: 'block', sm: 'none' } }} />
      <Stack
        sx={{
          height: 'fit-content',
          marginBottom: { xs: 0, sm: 1.5, md: 0 },
        }}
      >
        <Stack
          sx={{
            height: '100%',
            backgroundColor: (theme) => theme.palette.background.paper,
            borderRadius: { xs: 0, sm: 1.5 },
            padding: { xs: '0.5rem 1rem', sm: '1rem' },
          }}
        >
          <Player />
        </Stack>
      </Stack>
      {/* Mobile Nav */}
      <Divider sx={{ display: { xs: 'block', sm: 'none' } }} />
      <Stack
        sx={{
          display: { xs: 'flex', md: 'none' },
          height: 'fit-content',
        }}
      >
        <Stack
          sx={{
            height: '100%',
            backgroundColor: (theme) => theme.palette.background.paper,
            borderRadius: { xs: 0, sm: 1.5 },
            padding: { xs: '0.5rem 0.8rem 1rem 0.8rem', sm: '0.7rem' },
          }}
        >
          <MobileNavBar />
        </Stack>
      </Stack>
    </Stack>
    <QueueListDrawer />
  </Stack>
);
