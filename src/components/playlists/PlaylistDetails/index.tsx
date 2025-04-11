import { Stack, Typography, Chip, Divider } from '@mui/material';
import {
  PlayArrow,
  Favorite,
  FavoriteBorder,
  Shuffle,
} from '@mui/icons-material';
import { PlaylistExtended } from '@common/interfaces';
import { formatMs } from '@common/utils';
import { useLanguage } from '@hooks/common';
import { useExtendedTracksTable } from '@hooks/tracks';
import { Table, MediaHeader } from '@components/common';

interface PlaylistDetailsProps extends Partial<PlaylistExtended> {
  isSaved?: boolean;
  isLoadingRemainingTracks?: boolean;
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
  isLoadingRemainingTracks,
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
    <Stack gap={2}>
      <MediaHeader
        cover={images?.[0]?.url}
        title={name}
        owner={[
          {
            name: owner?.display_name,
            id: owner?.id,
            path: `/user-profile/${owner?.id}`,
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
            {/* {description && (
              <Typography color='textSecondary'>{description}</Typography>
            )} */}
            <Stack
              sx={{
                flexDirection: 'row',
                gap: 1,
                justifyContent: { xs: 'center', sm: 'flex-start' },
              }}
            >
              <Typography
                variant='subtitle2'
                sx={{ color: (theme) => theme.palette.text.secondary }}
              >
                {`${new Intl.NumberFormat().format(tracks?.total ?? 0)} ${t(
                  tracks?.total === 1
                    ? 'playlistDetails.header.metadata.tracks.singular'
                    : 'playlistDetails.header.metadata.tracks.plural'
                )}`}
              </Typography>
              <Divider orientation='vertical' flexItem />
              <Typography
                variant='subtitle2'
                sx={{ color: (theme) => theme.palette.text.secondary }}
              >
                {tracks?.items && tracks?.items?.length
                  ? formatMs(
                      tracks?.items.reduce(
                        (acc, curr) => curr.track.duration_ms + acc,
                        0
                      ),
                      true
                    )
                  : '0h 0m'}
              </Typography>
              <Divider orientation='vertical' flexItem />
              <Typography
                variant='subtitle2'
                sx={{ color: (theme) => theme.palette.text.secondary }}
              >
                {`${new Intl.NumberFormat().format(followers?.total ?? 0)} ${t(
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
        rowCount={tracks?.total}
        getRowId={(row) => row?.track?.id}
        slots={{
          columnHeaders: isSmartphone ? () => null : undefined,
        }}
        loading={isLoadingRemainingTracks}
        paginationMode='server'
        hideFooter
        disableRowSelectionOnClick
        disableColumnSelector
      />
    </Stack>
  );
};
