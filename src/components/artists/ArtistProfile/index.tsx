import { useNavigate } from 'react-router-dom';
import { Stack, Typography, Chip, Button, Divider } from '@mui/material';
import ChevronRight from '@mui/icons-material/ChevronRight';
import {
  ArtistExtended,
  ArtistBioResponse,
  ArtistTopTracksResponse,
  PartialAlbumsResponse,
} from '@common/interfaces';
import { useLanguage } from '@hooks/language';
import { useTracksTable } from '@hooks/tracks';
import { MediaHeader, Table } from '@components/common';
import { AlbumsGrid } from '@components/albums';

type ArtistData = Partial<
  ArtistExtended &
    ArtistBioResponse &
    ArtistTopTracksResponse &
    PartialAlbumsResponse
>;

interface ArtistProfileProps extends ArtistData {
  isFollowed?: boolean;
}

export const ArtistProfile = ({
  name,
  images,
  followers,
  genres,
  artist,
  tracks: topTracks,
  albums,
  singles,
  compilations,
  appearsOn,
  isFollowed,
}: ArtistProfileProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage('artist');
  const { isSmartphone, columns } = useTracksTable();
  const discographyData = [
    {
      title: t('sections.albums'),
      data: albums?.items || [],
      total: albums?.total ?? 0,
      redirect: 'albums',
    },
    {
      title: t('sections.singles'),
      data: singles?.items || [],
      total: singles?.total ?? 0,
      redirect: 'singles',
    },
    {
      title: t('sections.compilations'),
      data: compilations?.items || [],
      total: compilations?.total ?? 0,
      redirect: 'compilations',
    },
    {
      title: t('sections.appearsOn'),
      data: appearsOn?.items || [],
      total: appearsOn?.total ?? 0,
      redirect: 'appears-on',
    },
  ];

  return (
    <Stack gap={4}>
      <MediaHeader
        title={name}
        cover={images?.[0]?.url}
        followers={followers?.total}
        description={artist?.bio?.content?.split('<a')?.[0]}
        isSaved={isFollowed}
        isSmartphone={isSmartphone}
        onAdd={() => {}}
        onRemove={() => {}}
        onPlay={() => {}}
        onMore={() => {}}
        isArtist
        details={
          Boolean(genres?.length) && (
            <Stack
              sx={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 1,
                mt: 1,
                justifyContent: { xs: 'center', sm: 'flex-start' },
              }}
            >
              {genres?.map((genre) => (
                <Chip label={genre} size='small' />
              ))}
            </Stack>
          )
        }
      />
      {Boolean(topTracks?.length) && (
        <Stack gap={2}>
          <Typography
            variant='h6'
            sx={{ color: (theme) => theme.palette.accent.main }}
          >
            {t('sections.topTracks')}
          </Typography>
          <Table
            rows={topTracks}
            columns={columns.filter(Boolean)}
            slots={{
              columnHeaders: isSmartphone ? () => null : undefined,
            }}
            hideFooter
            disableRowSelectionOnClick
            disableColumnSelector
          />
        </Stack>
      )}
      {discographyData.map(
        ({ title, data, total, redirect }) =>
          Boolean(total) && (
            <Stack gap={2}>
              <Divider />
              <Stack
                sx={{ flexDirection: 'row', justifyContent: 'space-between' }}
              >
                <Stack
                  sx={{ flexDirection: 'row', alignItems: 'center', gap: 1 }}
                >
                  <Typography
                    variant='h6'
                    sx={{ color: (theme) => theme.palette.accent.main }}
                  >
                    {title}
                  </Typography>
                  <Typography variant='h6'>{total}</Typography>
                </Stack>
                {total > 10 && (
                  <Button
                    size='small'
                    variant='contained'
                    endIcon={<ChevronRight />}
                    onClick={() => navigate(redirect)}
                  >
                    More
                  </Button>
                )}
              </Stack>
              <AlbumsGrid data={data} displayReleaseDate />
            </Stack>
          )
      )}
    </Stack>
  );
};
