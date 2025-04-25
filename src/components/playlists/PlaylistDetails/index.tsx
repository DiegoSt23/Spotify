import { MouseEvent } from 'react';
import { Stack } from '@mui/material';
import {
  PlayArrow,
  Add,
  Shuffle,
  Edit,
} from '@mui/icons-material';
import {
  PlaylistExtended,
  ContextMenuPosition,
  Track,
} from '@common/interfaces';
import { getFeaturedArtists } from '@common/utils';
import { useLanguage, useFormatMs } from '@hooks/common';
import { useExtendedTracksTable } from '@hooks/tracks';
import { Table, MediaHeader } from '@components/common';
import { FeaturedArtists } from '@components/artists';
import { TrackListData, TrackContextMenu } from '@components/tracks';

interface PlaylistDetailsProps extends Partial<PlaylistExtended> {
  contextMenuPosition: ContextMenuPosition | null;
  selectedTrack: Track | null;
  onOpenContextMenu: (
    event: MouseEvent<HTMLDivElement | HTMLButtonElement>,
    id: string
  ) => void;
  onCloseContextMenu: () => void;
  onAddRemovePlaylist: () => void;
  onPlayPlaylist: () => void;
  onShufflePlaylist: () => void;
  onEditPlaylist: () => void;
  isOwnPlaylist: boolean;
  isLoadingFollowUnfollowPlaylist: boolean;
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
  contextMenuPosition,
  selectedTrack,
  onOpenContextMenu,
  onCloseContextMenu,
  onAddRemovePlaylist,
  onPlayPlaylist,
  onShufflePlaylist,
  onEditPlaylist,
  isOwnPlaylist,
  isLoadingFollowUnfollowPlaylist,
  isSaved,
  isLoading,
  isLoadingTracks,
}: PlaylistDetailsProps) => {
  const { t } = useLanguage('playlists');
  const { formattedTime } = useFormatMs(
    tracks?.items?.reduce((acc, curr) => curr.track.duration_ms + acc, 0) ?? 0,
    true
  );
  const { columns, isSmartphone } = useExtendedTracksTable(onOpenContextMenu);
  const featuredArtists = getFeaturedArtists(tracks?.items, 'playlist');
  const addRemoveAction = !isOwnPlaylist
    ? [
        {
          icon: (
            <Add
              sx={{
                fill: (theme) =>
                  isSaved
                    ? theme.palette.error.main
                    : theme.palette.primary.main,
                transform: isSaved ? 'rotate(45deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
              }}
            />
          ),
          onClick: onAddRemovePlaylist,
          description: isSaved
            ? t('playlistDetails.header.actions.remove')
            : t('playlistDetails.header.actions.add'),
          disabled: isLoadingFollowUnfollowPlaylist,
        },
      ]
    : [];
  const editAction = isOwnPlaylist
    ? [
        {
          icon: <Edit sx={{ width: 20, height: 20 }} />,
          onClick: onEditPlaylist,
          description: t('playlistDetails.header.actions.edit'),
        },
      ]
    : [];
  const actions = [
    ...addRemoveAction,
    {
      icon: <PlayArrow />,
      onClick: onPlayPlaylist,
      description: t('playlistDetails.header.actions.play'),
    },
    {
      icon: <Shuffle />,
      onClick: onShufflePlaylist,
      description: t('playlistDetails.header.actions.shuffle'),
    },
    ...editAction,
  ];
  const trackListData = [
    `${new Intl.NumberFormat().format(tracks?.total ?? 0)} ${t(
      tracks?.total === 1
        ? 'playlistDetails.header.metadata.tracks.singular'
        : 'playlistDetails.header.metadata.tracks.plural'
    )}`,
    formattedTime,
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
        onRowRightClick={onOpenContextMenu}
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
      {contextMenuPosition !== null && (
        <TrackContextMenu
          selectedTrack={selectedTrack}
          anchorPosition={contextMenuPosition}
          onClose={onCloseContextMenu}
        />
      )}
    </Stack>
  );
};
