import { Outlet, useParams, useLocation } from 'react-router-dom';
import { Typography, Skeleton } from '@mui/material';
import { ArtistResponse, AlbumCategory } from '@common/interfaces';
import { useLanguage } from '@hooks/common';
import { useGetArtistDetails } from '@services/artists';
import { Page } from '@components/layout';

export interface ArtistContext {
  isFetchingArtistData: boolean;
  category: AlbumCategory;
  id?: string;
  artistData?: ArtistResponse;
}

export const ArtistLayout = () => {
  const { t } = useLanguage('artists');
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetArtistDetails(id);

  const categories = {
    'albums': 'album',
    'singles': 'single',
    'compilations': 'compilation',
    'appears-on': 'appears_on',
  };

  const getCategoryName = () => {
    if (pathname.includes('artist') && pathname.includes('albums')) {
      return t('artistProfile.sections.albums');
    } else if (pathname.includes('artist') && pathname.includes('singles')) {
      return t('artistProfile.sections.singles');
    } else if (
      pathname.includes('artist') &&
      pathname.includes('compilations')
    ) {
      return t('artistProfile.sections.compilations');
    } else if (pathname.includes('artist') && pathname.includes('appears-on')) {
      return t('artistProfile.sections.appearsOn');
    } else {
      return '';
    }
  };

  const artistContext: ArtistContext = {
    id,
    artistData: data,
    isFetchingArtistData: isLoading,
    category: (categories[pathname.split('/')[3] as keyof typeof categories] ||
      '') as AlbumCategory,
  };

  return (
    <Page
      title={isLoading ? <Skeleton width={150} height={30} /> : data?.name || ''}
      headerElement={
        getCategoryName() && (
          <Typography color='textSecondary' variant='subtitle1'>
            {getCategoryName()}
          </Typography>
        )
      }
    >
      <Outlet context={artistContext satisfies ArtistContext} />
    </Page>
  );
};
