import { Outlet, useParams, useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';
import { ArtistResponse } from '@common/interfaces';
import { useLanguage } from '@hooks/language';
import { useGetArtistDetails } from '@hooks/artists';
import { Page } from '@components/layout';

export interface ArtistContext {
  id?: string;
  artistData?: ArtistResponse;
  isFetchingArtistData: boolean;
}

export const ArtistLayout = () => {
  const { t } = useLanguage('artists');
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetArtistDetails(id);

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
  };

  return (
    <Page
      title={data?.name || ''}
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
