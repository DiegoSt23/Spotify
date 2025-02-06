import { createBrowserRouter } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Dashboard } from '@components/atomic';
import { StyleGuide, Login, NotFound } from '@pages/index';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Dashboard />,
    children: [
      {
        path: 'home',
        element: (
          <Typography variant='h4'>
            Home
          </Typography>
        ),
      },
      {
        path: 'search',
        element: <Typography variant='h4'>Search</Typography>,
      },
      {
        path: 'stats',
        element: <Typography variant='h4'>Stats</Typography>,
      },
      {
        path: 'songs',
        element: <Typography variant='h4'>Songs</Typography>,
      },
      {
        path: 'artists',
        element: <Typography variant='h4'>Artists</Typography>,
      },
      {
        path: 'albums',
        element: <Typography variant='h4'>Albums</Typography>,
      },
      {
        path: 'playlists',
        element: <Typography variant='h4'>Playlists</Typography>,
      },
      {
        path: 'podcasts',
        element: <Typography variant='h4'>Podcasts</Typography>,
      },
      {
        path: 'profile',
        element: <Typography variant='h4'>Profile</Typography>,
      },
      {
        path: 'about',
        element: <Typography variant='h4'>About</Typography>,
      },
      {
        path: 'settings',
        element: <Typography variant='h4'>Settings</Typography>,
      },
    ],
  },
  {
    path: '/style-guide',
    element: <StyleGuide />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
