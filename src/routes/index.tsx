import { createBrowserRouter } from 'react-router-dom';
import {
  PrivateRoute,
  Dashboard,
  ArtistsLayout,
  AlbumsLayout,
  PlaylistsLayout,
} from '@components/index';
import {
  Login,
  Home,
  Search,
  Stats,
  Songs,
  CurrentUserArtists,
  CurrentUserAlbums,
  CurrentUserPlaylists,
  AlbumDetails,
  ArtistProfile,
  ArtistAlbums,
  ArtistSingles,
  ArtistCompilations,
  ArtistAppearsOn,
  PlaylistDetails,
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
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
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
        element: <ArtistsLayout />,
        children: [
          {
            path: 'me',
            element: <CurrentUserArtists />,
          },
          {
            path: ':id',
            element: <ArtistProfile />,
          },
          {
            path: ':id/albums',
            element: <ArtistAlbums />,
          },
          {
            path: ':id/singles',
            element: <ArtistSingles />,
          },
          {
            path: ':id/compilations',
            element: <ArtistCompilations />,
          },
          {
            path: ':id/appears-on',
            element: <ArtistAppearsOn />,
          },
        ],
      },
      {
        path: 'albums',
        element: <AlbumsLayout />,
        children: [
          {
            path: 'me',
            element: <CurrentUserAlbums />,
          },
          {
            path: ':id',
            element: <AlbumDetails />,
          },
        ],
      },
      {
        path: 'playlists',
        element: <PlaylistsLayout />,
        children: [
          {
            path: 'me',
            element: <CurrentUserPlaylists />,
          },
          {
            path: ':id',
            element: <PlaylistDetails />,
          },
        ],
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
