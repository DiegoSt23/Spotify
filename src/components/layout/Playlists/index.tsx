import { Outlet } from 'react-router-dom';
import { Page } from '@components/layout';

export const PlaylistsLayout = () => (
  <Page title='Playlists'>
    <Outlet />
  </Page>
);
