import { Stack, Typography, Chip, Divider } from '@mui/material';
import { PlaylistExtended } from '@common/interfaces';
import { formatMs } from '@common/utils';
import { useExtendedTracksTable } from '@hooks/tracks';
import { Table, MediaHeader } from '@components/common';

interface PlaylistDetailsProps extends Partial<PlaylistExtended> {
  isSaved?: boolean;
}

export const PlaylistDetails = ({
  images,
  name,
  description,
  owner,
  tracks,
  followers,
  public: isPublic,
  collaborative,
  isSaved,
}: PlaylistDetailsProps) => {
  const { columns, isSmartphone } = useExtendedTracksTable();

  return (
    <Stack gap={3}>
      <MediaHeader
        cover={images?.[0]?.url}
        title={name}
        owner={owner?.display_name}
        description={description}
        isSaved={isSaved}
        isSmartphone={isSmartphone}
        onAdd={() => {}}
        onRemove={() => {}}
        onPlay={() => {}}
        onMore={() => {}}
        details={
          <Stack
            sx={{
              justifyContent: { xs: 'center', sm: 'flex-start' },
              gap: 1,
              mt: { xs: 0, sm: 0.5 },
            }}
          >
            <Stack
              sx={{
                flexDirection: 'row',
                gap: 1,
                justifyContent: { xs: 'center', sm: 'flex-start' },
              }}
            >
              <Typography
                variant='subtitle2'
                sx={{ color: (theme) => theme.palette.text.disabled }}
              >
                {`${tracks?.total} tracks`}
              </Typography>
              <Divider orientation='vertical' flexItem />
              <Typography
                variant='subtitle2'
                sx={{ color: (theme) => theme.palette.text.disabled }}
              >
                {formatMs(
                  tracks?.items.reduce(
                    (acc, curr) => curr.track.duration_ms + acc,
                    0
                  ),
                  true
                )}
              </Typography>
              <Divider orientation='vertical' flexItem />
              <Typography
                variant='subtitle2'
                sx={{ color: (theme) => theme.palette.text.disabled }}
              >
                {`${followers?.total} followers`}
              </Typography>
            </Stack>
            <Stack
              sx={{
                flexDirection: 'row',
                gap: 1,
                justifyContent: { xs: 'center', sm: 'flex-start' },
              }}
            >
              <Chip label={isPublic ? 'Public' : 'Private'} size='small' />
              {collaborative && <Chip label='Collaborative' size='small' />}
            </Stack>
          </Stack>
        }
      />
      <Table
        columns={columns.filter(Boolean)}
        rows={tracks?.items}
        getRowId={(row) => row?.track?.id}
        slots={{
          columnHeaders: isSmartphone ? () => null : undefined,
        }}
        hideFooter
        disableRowSelectionOnClick
        disableColumnSelector
      />
    </Stack>
  );
};
