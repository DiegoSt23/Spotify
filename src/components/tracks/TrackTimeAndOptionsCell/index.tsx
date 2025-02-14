import { Stack, Typography, IconButton } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { formatMs } from '@common/utils';

interface TrackTimeAndOptionsCellProps {
  ms: number;
  isSmartphone: boolean;
}

export const TrackTimeAndOptionsCell = ({
  ms,
  isSmartphone,
}: TrackTimeAndOptionsCellProps) => (
  <Stack
    sx={{
      height: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: isSmartphone ? 'flex-end' : 'space-between',
      gap: 1,
    }}
  >
    <Typography
      sx={{
        color: (theme) => theme.palette.text.disabled,
        display: { xs: 'none', sm: 'flex' },
      }}
    >
      {formatMs(ms)}
    </Typography>
    <IconButton size='small' edge='end'>
      <MoreVert />
    </IconButton>
  </Stack>
);
