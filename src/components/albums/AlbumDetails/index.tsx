import { Link as Routerlink } from 'react-router-dom';
import { Stack, Typography, Divider, Chip, Button } from '@mui/material';
import {
  PlayArrow,
  Favorite,
  FavoriteBorder,
  Shuffle,
} from '@mui/icons-material';
import { AlbumExtended } from '@common/interfaces';
import { formatMs, getFeaturedArtists } from '@common/utils';
import { useLanguage } from '@hooks/language';
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
  const { t } = useLanguage('albums');
  const { columns, isSmartphone } = useMinimalTracksTable();
  const featuredArtists = getFeaturedArtists(tracks?.items);
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

  return (
    <Stack gap={3}>
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
                sx={{ color: (theme) => theme.palette.text.secondary }}
              >
                {release_date?.split('-')[0]}
              </Typography>
              <Divider orientation='vertical' flexItem />
              <Typography
                variant='subtitle2'
                sx={{ color: (theme) => theme.palette.text.secondary }}
              >
                {total_tracks &&
                  `${total_tracks} ${t(
                    total_tracks === 1
                      ? 'albumDetails.header.metadata.tracks.singular'
                      : 'albumDetails.header.metadata.tracks.plural'
                  )}`}
              </Typography>
              <Divider orientation='vertical' flexItem />
              <Typography
                variant='subtitle2'
                sx={{ color: (theme) => theme.palette.text.secondary }}
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
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          {copyrights?.[0]?.text}
        </Typography>
        <Divider orientation='vertical' flexItem />
        <Typography
          variant='caption'
          sx={{
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          {label}
        </Typography>
      </Stack>
      {featuredArtists.length > 1 && (
        <Stack gap={1}>
          <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: 1 }}>
            <Typography variant='h6'>
              {t('albumDetails.sections.featuredArtists')}
            </Typography>
            <Chip
              label={featuredArtists.length}
              size='small'
              sx={{ color: (theme) => theme.palette.accent.main }}
            />
          </Stack>
          <Stack
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 2,
              overflow: 'auto',
            }}
          >
            {featuredArtists.map(({ name, id }) => (
              <Button
                key={id}
                variant='outlined'
                component={Routerlink}
                to={`/artist/${id}`}
                sx={{ whiteSpace: 'nowrap', minWidth: 'max-content' }}
              >
                {name}
              </Button>
            ))}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};
