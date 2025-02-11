import { Drawer, Stack, Typography } from '@mui/material';
import { useStore } from '@store/index';

export const QueueListDrawer = () => {
  const open = useStore((state) => state.isQueueDrawerOpen);
  const toggleDrawer = useStore((state) => state.toggleQueueDrawer);
  
  return (
    <Drawer
      open={open}
      onClose={() => toggleDrawer(false)}
      sx={{ zIndex: 1399, backdropFilter: 'blur(5px)' }}
      anchor='right'
    >
      <Stack
        sx={{
          padding: 2,
          width: { xs: '100dvw', sm: 400 },
          backgroundColor: (theme) => theme.palette.background.paper,
          borderLeft: (theme) => `1px solid ${theme.palette.divider}`,
          height: '100dvh',
        }}
      >
        <Typography variant="h5">Queue</Typography>
      </Stack>
    </Drawer>
  );
};
