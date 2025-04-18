import { MouseEvent } from 'react';
import {
  Stack,
  Typography,
  Chip,
  Skeleton,
  type Theme,
} from '@mui/material';
import {
  PlayArrow,
  Add,
  Shuffle,
  QueueMusic,
  PlaylistAdd,
  ContentCopy
} from '@mui/icons-material';
import {
  AlbumExtended,
  ContextMenuPosition,
  TrackContext,
} from '@common/interfaces';
import { getFeaturedArtists } from '@common/utils';
import { useLanguage, useFormatMs } from '@hooks/common';
import { useMinimalTracksTable } from '@hooks/tracks';
import { Table, MediaHeader, ContextMenu } from '@components/common';
import { FeaturedArtists } from '@components/artists';
import { TrackListData } from '@components/tracks';

interface AlbumDetailsProps extends Partial<AlbumExtended> {
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
  isLoadingRemainingTracks?: boolean;
}


const contextMenuIconSx = {
  width: 20,
  height: 20,
  fill: (theme: Theme) => theme.palette.accent.main,
};

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
  isLoadingRemainingTracks,
}: AlbumDetailsProps) => {
  const { t } = useLanguage('albums');
  const { columns, isSmartphone } = useMinimalTracksTable(onOpenContextMenu);
  const { formattedTime } = useFormatMs(
    tracks?.items.reduce((acc, curr) => curr.duration_ms + acc, 0) ?? 0,
    true
  );
  const trackListData = [
    release_date?.split('-')[0] ?? '-',
    `${new Intl.NumberFormat().format(total_tracks ?? 0)} ${t(
      total_tracks === 1
        ? 'albumDetails.header.metadata.tracks.singular'
        : 'albumDetails.header.metadata.tracks.plural'
    )}`,
    formattedTime,
  ];
  const featuredArtists = getFeaturedArtists(tracks?.items, 'album');
  const headerActions = [
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
        ? t('albumDetails.header.actions.remove')
        : t('albumDetails.header.actions.add'),
    },
    {
      icon: <PlayArrow />,
      onClick: () => {},
      description: t('albumDetails.header.actions.play'),
    },
    {
      icon: <Shuffle />,
      onClick: () => {},
      description: t('albumDetails.header.actions.shuffle'),
    },
  ];
  const trackOptions = [
    {
      label: t('albumDetails.trackOptions.add'),
      action: onAddTrack,
      icon: <Add sx={contextMenuIconSx} />,
    },
    {
      label: t('albumDetails.trackOptions.addToQueue'),
      action: onAddTrackToQueue,
      icon: <QueueMusic sx={contextMenuIconSx} />,
    },
    {
      label: t('albumDetails.trackOptions.addToPlaylist'),
      action: onAddTrackToPlaylist,
      icon: <PlaylistAdd sx={contextMenuIconSx} />,
    },
    {
      label: t('albumDetails.trackOptions.copyLink'),
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
        owner={artists?.map(({ name, id }) => ({
          name,
          id,
          path: `/artist/${id}`,
        }))}
        isSmartphone={isSmartphone}
        actions={headerActions}
        details={
          <Stack
            sx={{
              justifyContent: { xs: 'center', sm: 'flex-start' },
              flexDirection: 'row',
              mt: 1,
              gap: 1,
            }}
          >
            {isLoading ? (
              <Skeleton
                variant='text'
                width={45}
                height={38}
                sx={{ position: 'relative', top: -7 }}
              />
            ) : (
              <>
                <Chip label={release_date?.split('-')[0]} size='small' />
                {albumType === 'compilation' && (
                  <Chip label={albumType} size='small' />
                )}
              </>
            )}
          </Stack>
        }
        isLoading={isLoading}
      />
      <Table
        columns={columns.filter(Boolean)}
        rows={isLoading ? [] : tracks?.items}
        rowCount={total_tracks ?? 10}
        slots={{
          columnHeaders: () => null,
        }}
        onRowRightClick={onOpenContextMenu}
        loading={isLoading || isLoadingRemainingTracks}
        paginationMode='server'
        hideFooter
        disableRowSelectionOnClick
        disableColumnSelector
      />
      {!isLoading && !isLoadingRemainingTracks && (
        <>
          <TrackListData data={trackListData} />
          <Stack>
            {copyrights?.[0]?.text && (
              <Typography
                variant='caption'
                sx={{
                  color: (theme) => theme.palette.text.secondary,
                }}
              >
                {copyrights[0].text}
              </Typography>
            )}
            <Typography
              variant='caption'
              sx={{
                color: (theme) => theme.palette.text.secondary,
              }}
            >
              {label}
            </Typography>
          </Stack>
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
