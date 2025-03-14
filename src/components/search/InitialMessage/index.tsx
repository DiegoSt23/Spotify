import { Stack, Typography, CircularProgress } from '@mui/material';
import { Search } from '@mui/icons-material';

interface InitialMessageProps {
  isLoading: boolean;
}

export const InitialMessage = ({ isLoading }: InitialMessageProps) => (
  <Stack
    sx={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {isLoading ? (
      <CircularProgress />
    ) : (
      <Stack
        sx={{
          textAlign: 'center',
          alignItems: 'center',
        }}
      >
        <Search sx={{ color: (theme) => theme.palette.text.secondary }} />
        <Typography
          variant='subtitle1'
          sx={{ color: (theme) => theme.palette.text.secondary }}
        >
          Use the input above to search your favorite songs, artists, albums or
          podcasts.
        </Typography>
      </Stack>
    )}
  </Stack>
);