import { Outlet } from 'react-router-dom';
import { Page } from '@components/layout';

export const AlbumsLayout = () => (
  <Page title='Albums'>
    <Outlet />
  </Page>
);
