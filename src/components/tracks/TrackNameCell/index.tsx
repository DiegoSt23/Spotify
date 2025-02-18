import { Stack, Typography } from '@mui/material';
import { Explicit } from '@mui/icons-material';

interface TrackNameCellProps {
  trackNumber: number;
  trackName: string;
  artistName?: string;
  explicit?: boolean;
  isSmartphone?: boolean;
}

export const TrackNameCell = ({
  trackNumber,
  trackName,
  artistName,
  explicit,
  isSmartphone,
}: TrackNameCellProps) => (
  <Stack
    sx={{
      height: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    }}
  >
    <Stack
      sx={{ display: { xs: 'none', sm: 'flex' }, width: 25, minWidth: 25 }}
    >
      <Typography
        variant='caption'
        sx={{ color: (theme) => theme.palette.text.disabled }}
      >
        {trackNumber}
      </Typography>
    </Stack>
    <Stack overflow='hidden'>
      <Typography
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {trackName}
      </Typography>
      {artistName && isSmartphone && (
        <Typography
          variant='body2'
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            color: (theme) => theme.palette.text.disabled,
          }}
        >
          {artistName}
        </Typography>
      )}
    </Stack>
    {explicit && (
      <Explicit
        sx={{
          width: 18,
          height: 18,
          ml: 1,
          color: (theme) => theme.palette.text.disabled,
        }}
      />
    )}
  </Stack>
);
