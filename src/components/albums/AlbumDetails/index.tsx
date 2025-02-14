import {
  Stack,
  Typography,
  Divider,
} from '@mui/material';
import { AlbumExtended } from '@common/interfaces';
import { useMinimalTracksTable } from '@hooks/tracks';
import { Table, MediaHeader } from '@components/common';

export const AlbumDetails = ({
  name,
  artists,
  release_date,
  label,
  images,
  total_tracks,
  tracks,
  copyrights,
}: Partial<AlbumExtended>) => {
  const { columns, isSmartphone } = useMinimalTracksTable();

  return (
    <Stack gap={3}>
      <MediaHeader
        cover={images?.[0]?.url}
        title={name}
        owner={artists?.map((artist) => artist.name)}
        details={
          <Stack
            sx={{
              flexDirection: 'row',
              justifyContent: { xs: 'center', sm: 'flex-start' },
              gap: 1,
              mt: { xs: 0, sm: 0.5 },
            }}
          >
            <Typography
              variant='subtitle2'
              sx={{ color: (theme) => theme.palette.text.disabled }}
            >
              {release_date?.split('-')[0]}
            </Typography>
            <Divider orientation='vertical' flexItem />
            <Typography
              variant='subtitle2'
              sx={{ color: (theme) => theme.palette.text.disabled }}
            >
              {total_tracks && `${total_tracks} tracks`}
            </Typography>
          </Stack>
        }
        isSmartphone={isSmartphone}
      />
      <Table
        columns={columns}
        rows={tracks?.items}
        slots={{
          columnHeaders: () => null,
        }}
        hideFooter
        disableRowSelectionOnClick
        disableColumnSelector
      />
      <Stack sx={{ flexDirection: 'row', justifyContent: 'center', gap: 1 }}>
        <Typography
          variant='caption'
          sx={{
            color: (theme) => theme.palette.text.disabled,
          }}
        >
          {copyrights?.[0]?.text}
        </Typography>
        <Divider orientation='vertical' flexItem />
        <Typography
          variant='caption'
          sx={{
            color: (theme) => theme.palette.text.disabled,
          }}
        >
          {label}
        </Typography>
      </Stack>
    </Stack>
  );
};
