import { Stack } from '@mui/material';
import {
  PlayArrow,
  Favorite,
  FavoriteBorder,
  Shuffle,
} from '@mui/icons-material';
import { PlaylistExtended } from '@common/interfaces';
import { formatMs, getFeaturedArtists } from '@common/utils';
import { useLanguage } from '@hooks/common';
import { useExtendedTracksTable } from '@hooks/tracks';
import { Table, MediaHeader } from '@components/common';
import { FeaturedArtists } from '@components/artists';
import { TrackListData } from '@components/tracks';

interface PlaylistDetailsProps extends Partial<PlaylistExtended> {
  isSaved?: boolean;
  isLoading?: boolean;
  isLoadingTracks?: boolean;
}

export const PlaylistDetails = ({
  images,
  name,
  // description,
  owner,
  tracks,
  followers,
  isSaved,
  isLoading,
  isLoadingTracks,
}: PlaylistDetailsProps) => {
  const { t } = useLanguage('playlists');
  const { columns, isSmartphone } = useExtendedTracksTable();
  const featuredArtists = getFeaturedArtists(tracks?.items, 'playlist');
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
  const trackListData = [
    `${new Intl.NumberFormat().format(tracks?.total ?? 0)} ${t(
      tracks?.total === 1
        ? 'playlistDetails.header.metadata.tracks.singular'
        : 'playlistDetails.header.metadata.tracks.plural'
    )}`,
    tracks?.items && tracks?.items?.length
      ? formatMs(
          tracks?.items.reduce((acc, curr) => curr.track.duration_ms + acc, 0),
          true
        )
      : '0h 0m',
    `${new Intl.NumberFormat().format(followers?.total ?? 0)} ${t(
      followers?.total === 1
        ? 'playlistDetails.header.metadata.followers.singular'
        : 'playlistDetails.header.metadata.followers.plural'
    )}`,
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
        isLoading={isLoading}
      />
      <Table
        columns={columns.filter(Boolean)}
        rows={tracks?.items}
        rowCount={tracks?.total}
        getRowId={(row) => row?.track?.id}
        slots={{
          columnHeaders: isSmartphone ? () => null : undefined,
        }}
        loading={isLoadingTracks}
        paginationMode='server'
        hideFooter
        disableRowSelectionOnClick
        disableColumnSelector
      />
      {!isLoading && !isLoadingTracks && (
        <>
          <TrackListData data={trackListData} />
          <FeaturedArtists data={featuredArtists} />
        </>
      )}
    </Stack>
  );
};
