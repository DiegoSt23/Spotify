import { Stack, CircularProgress } from '@mui/material';

export const Loading = () => (
  <Stack sx={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <CircularProgress size={30} />
  </Stack>
);
