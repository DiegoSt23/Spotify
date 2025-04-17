import { Stack, Typography, Chip, Skeleton } from '@mui/material';
import {
  PlayArrow,
  Add,
  Shuffle,
} from '@mui/icons-material';
import { AlbumExtended } from '@common/interfaces';
import { getFeaturedArtists } from '@common/utils';
import { useLanguage, useFormatMs } from '@hooks/common';
import { useMinimalTracksTable } from '@hooks/tracks';
import { Table, MediaHeader } from '@components/common';
import { FeaturedArtists } from '@components/artists';
import { TrackListData } from '@components/tracks';

interface AlbumDetailsProps extends Partial<AlbumExtended> {
  isSaved?: boolean;
  isLoading?: boolean;
  isLoadingRemainingTracks?: boolean;
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
  isLoading,
  isLoadingRemainingTracks,
}: AlbumDetailsProps) => {
  const { t } = useLanguage('albums');
  const { formattedTime } = useFormatMs(
    tracks?.items.reduce((acc, curr) => curr.duration_ms + acc, 0) ?? 0,
    true
  );
  const { columns, isSmartphone } = useMinimalTracksTable();
  const featuredArtists = getFeaturedArtists(tracks?.items, 'album');
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
  const trackListData = [
    release_date?.split('-')[0] ?? '-',
    `${new Intl.NumberFormat().format(total_tracks ?? 0)} ${t(
      total_tracks === 1
        ? 'albumDetails.header.metadata.tracks.singular'
        : 'albumDetails.header.metadata.tracks.plural'
    )}`,
    formattedTime,
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
        actions={actions}
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
                {copyrights?.[0]?.text}
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
    </Stack>
  );
};
