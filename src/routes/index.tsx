import { createBrowserRouter } from 'react-router-dom';
import { Dashboard } from '@components/layout';
import {
  Login,
  Home,
  Search,
  Stats,
  Songs,
  Artists,
  Albums,
  Playlists,
  Podcasts,
  Profile,
  About,
  Settings,
  NotFound,
  StyleGuide,
} from '@pages/index';

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
        element: <Home />,
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'stats',
        element: <Stats />,
      },
      {
        path: 'songs',
        element: <Songs />,
      },
      {
        path: 'artists',
        element: <Artists />,
      },
      {
        path: 'albums',
        element: <Albums />,
      },
      {
        path: 'playlists',
        element: <Playlists />,
      },
      {
        path: 'podcasts',
        element: <Podcasts />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'settings',
        element: <Settings />,
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
