import {
  Stack,
  Typography,
  Divider,
  Chip,
} from '@mui/material';
import { AlbumExtended } from '@common/interfaces';
import { formatMs } from '@common/utils';
import { useMinimalTracksTable } from '@hooks/tracks';
import { Table, MediaHeader } from '@components/common';

interface AlbumDetailsProps extends Partial<AlbumExtended> {
  isSaved?: boolean;
}

export const AlbumDetails = ({
  name,
  artists,
  release_date,
  label,
  images,
  total_tracks,
  tracks,
  copyrights,
  album_type: albumType,
  isSaved,
}: AlbumDetailsProps) => {
  const { columns, isSmartphone } = useMinimalTracksTable();

  return (
    <Stack gap={3}>
      <MediaHeader
        cover={images?.[0]?.url}
        title={name}
        owner={artists?.map((artist) => artist.name)}
        isSaved={isSaved}
        isSmartphone={isSmartphone}
        onAdd={() => {}}
        onRemove={() => {}}
        onPlay={() => {}}
        onMore={() => {}}
        details={
          <Stack
            gap={1}
            sx={{ alignItems: { xs: 'center', sm: 'flex-start' } }}
          >
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
              <Divider orientation='vertical' flexItem />
              <Typography
                variant='subtitle2'
                sx={{ color: (theme) => theme.palette.text.disabled }}
              >
                {formatMs(
                  tracks?.items.reduce(
                    (acc, curr) => curr.duration_ms + acc,
                    0
                  ),
                  true
                )}
              </Typography>
            </Stack>
            <Chip label={albumType} size='small' />
          </Stack>
        }
      />
      <Table
        columns={columns.filter(Boolean)}
        rows={tracks?.items}
        slots={{
          columnHeaders: () => null,
        }}
        hideFooter
        disableRowSelectionOnClick
        disableColumnSelector
      />
      <Stack>
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
