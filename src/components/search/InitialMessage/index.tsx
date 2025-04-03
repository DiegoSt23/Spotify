import { Stack, Typography, CircularProgress } from '@mui/material';
import { Search } from '@mui/icons-material';

interface InitialMessageProps {
  message: string;
  isLoading: boolean;
}

export const InitialMessage = ({ message, isLoading }: InitialMessageProps) => (
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
        <Search sx={{ color: (theme) => theme.palette.accent.main }} />
        <Typography
          variant='subtitle1'
          sx={{ color: (theme) => theme.palette.text.secondary }}
        >
          {message}
        </Typography>
      </Stack>
    )}
  </Stack>
);