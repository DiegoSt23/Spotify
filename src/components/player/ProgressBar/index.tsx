import {
  Stack,
  Typography,
  LinearProgress,
  type LinearProgressProps,
  type StackProps,
} from '@mui/material';

interface ProgressBarProps extends LinearProgressProps {
  containerProps?: StackProps;
}

export const ProgressBar = ({ containerProps, ...props }: ProgressBarProps) => (
  <Stack
    {...containerProps}
    sx={{
      gap: 1.5,
      ...containerProps?.sx,
    }}
  >
    <LinearProgress {...props} />
    <Stack
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        top: 6,
      }}
    >
      <Typography
        variant='caption'
        sx={{
          color: (theme) => theme.palette.text.disabled,
          lineHeight: 1,
        }}
      >
        03:45
      </Typography>
      <Typography
        variant='caption'
        sx={{
          color: (theme) => theme.palette.text.disabled,
          lineHeight: 1,
        }}
      >
        05:30
      </Typography>
    </Stack>
  </Stack>
);
