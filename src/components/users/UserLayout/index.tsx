import { Outlet, useParams, useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';
import { UserResponse } from '@common/interfaces';
import { useLanguage } from '@hooks/common';
import { useGetUserData } from '@services/users';
import { Page } from '@components/layout';

export interface UserContext {
  id?: string;
  userData?: UserResponse;
  isFetchingUserData: boolean;
}

export const UserLayout = () => {
  const { t } = useLanguage('users');
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const { data, isFetching } = useGetUserData(id);

  const artistContext: UserContext = {
    id,
    userData: data,
    isFetchingUserData: isFetching,
  };

  return (
    <Page
      title={data?.display_name}
      headerElement={
        pathname.includes('playlists') && (
          <Typography color='textSecondary' variant='subtitle1'>
            {t('sections.playlists')}
          </Typography>
        )
      }
    >
      <Outlet context={artistContext satisfies UserContext} />
    </Page>
  );
};
