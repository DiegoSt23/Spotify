import { MouseEvent } from 'react';
import { Stack, type Theme } from '@mui/material';
import {
  PlayArrow,
  Add,
  Shuffle,
  QueueMusic,
  PlaylistAdd,
  ContentCopy,
} from '@mui/icons-material';
import {
  PlaylistExtended,
  ContextMenuPosition,
  TrackContext,
} from '@common/interfaces';
import { getFeaturedArtists } from '@common/utils';
import { useLanguage, useFormatMs } from '@hooks/common';
import { useExtendedTracksTable } from '@hooks/tracks';
import { Table, MediaHeader, ContextMenu } from '@components/common';
import { FeaturedArtists } from '@components/artists';
import { TrackListData } from '@components/tracks';

interface PlaylistDetailsProps extends Partial<PlaylistExtended> {
  contextMenuPosition: ContextMenuPosition | null;
  trackContext: TrackContext;
  onOpenContextMenu: (
    event: MouseEvent<HTMLDivElement | HTMLButtonElement>,
    id: string
  ) => void;
  onCloseContextMenu: () => void;
  onAddTrack: () => void;
  onAddTrackToQueue: () => void;
  onAddTrackToPlaylist: () => void;
  onCopyTrackLink: () => void;
  isSaved?: boolean;
  isLoading?: boolean;
  isLoadingTracks?: boolean;
}

const contextMenuIconSx = {
  width: 20,
  height: 20,
  fill: (theme: Theme) => theme.palette.accent.main,
};

export const PlaylistDetails = ({
  images,
  name,
  // description,
  owner,
  tracks,
  followers,
  contextMenuPosition,
  trackContext,
  onOpenContextMenu,
  onCloseContextMenu,
  onAddTrack,
  onAddTrackToQueue,
  onAddTrackToPlaylist,
  onCopyTrackLink,
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
  const actions = [
    {
      icon: (
        <Add
          sx={{
            fill: (theme) =>
              isSaved ? theme.palette.error.main : theme.palette.primary.main,
            transform: isSaved ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
          }}
        />
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
    formattedTime,
    `${new Intl.NumberFormat().format(followers?.total ?? 0)} ${t(
      followers?.total === 1
        ? 'playlistDetails.header.metadata.followers.singular'
        : 'playlistDetails.header.metadata.followers.plural'
    )}`,
  ];
  const trackOptions = [
    {
      label: t('playlistDetails.trackOptions.add'),
      action: onAddTrack,
      icon: <Add sx={contextMenuIconSx} />,
    },
    {
      label: t('playlistDetails.trackOptions.addToQueue'),
      action: onAddTrackToQueue,
      icon: <QueueMusic sx={contextMenuIconSx} />,
    },
    {
      label: t('playlistDetails.trackOptions.addToPlaylist'),
      action: onAddTrackToPlaylist,
      icon: <PlaylistAdd sx={contextMenuIconSx} />,
    },
    {
      label: t('playlistDetails.trackOptions.copyLink'),
      action: onCopyTrackLink,
      icon: (
        <ContentCopy
          sx={{ width: 18, height: 18, fill: contextMenuIconSx.fill }}
        />
      ),
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
        <ContextMenu
          title={trackContext.name}
          subtitle={trackContext.artists}
          options={trackOptions}
          anchorPosition={contextMenuPosition}
          onClose={onCloseContextMenu}
        />
      )}
    </Stack>
  );
};
