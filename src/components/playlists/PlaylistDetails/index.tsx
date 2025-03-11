import { Stack, Typography, Chip, Divider } from '@mui/material';
import {
  PlayArrow,
  Favorite,
  FavoriteBorder,
  Shuffle,
} from '@mui/icons-material';
import { PlaylistExtended } from '@common/interfaces';
import { formatMs } from '@common/utils';
import { useLanguage } from '@hooks/language';
import { useExtendedTracksTable } from '@hooks/tracks';
import { Table, MediaHeader } from '@components/common';

interface PlaylistDetailsProps extends Partial<PlaylistExtended> {
  isSaved?: boolean;
}

export const PlaylistDetails = ({
  images,
  name,
  // description,
  owner,
  tracks,
  followers,
  public: isPublic,
  collaborative,
  isSaved,
}: PlaylistDetailsProps) => {
  const { t } = useLanguage('playlists');
  const { columns, isSmartphone } = useExtendedTracksTable();
  const actions = [
    {
      icon: isSaved ? (
        <Favorite
          sx={{
            width: 20,
            height: 20,
            fill: (theme) => theme.palette.accent.main,
          }}
        />
      ) : (
        <FavoriteBorder sx={{ width: 20, height: 20 }} />
      ),
      onClick: () => {},
      description: isSaved
        ? t('playlistDetails.header.actions.remove')
        : t('playlistDetails.header.actions.add'),
    },
    {
      icon: <PlayArrow />,
      onClick: () => {},
      description: t('playlistDetails.header.actions.play'),
    },
    {
      icon: <Shuffle />,
      onClick: () => {},
      description: t('playlistDetails.header.actions.shuffle'),
    },
  ];

  return (
    <Stack gap={3}>
      <MediaHeader
        cover={images?.[0]?.url}
        title={name}
        owner={[
          {
            name: owner?.display_name,
            id: owner?.id,
            path: `/profile/${owner?.id}`,
          },
        ]}
        isSmartphone={isSmartphone}
        actions={actions}
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
                {`${tracks?.total} ${t(
                  tracks?.total === 1
                    ? 'playlistDetails.header.metadata.tracks.singular'
                    : 'playlistDetails.header.metadata.tracks.plural'
                )}`}
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
                {`${followers?.total} ${t(
                  followers?.total === 1
                    ? 'playlistDetails.header.metadata.followers.singular'
                    : 'playlistDetails.header.metadata.followers.plural'
                )}`}
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
