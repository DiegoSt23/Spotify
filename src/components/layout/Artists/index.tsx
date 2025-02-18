import { Outlet } from 'react-router-dom';
import { Page } from '@components/layout';

export const ArtistsLayout = () => (
  <Page title='Artists'>
    <Outlet />
  </Page>
);
