import { Stack, CircularProgress } from '@mui/material';

export const Loading = () => (
  <Stack
    sx={{
      width: '100%',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <CircularProgress size={30} />
  </Stack>
);
