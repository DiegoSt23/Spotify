import { createBrowserRouter } from 'react-router-dom';
import {
  PrivateRoute,
  Dashboard,
  ArtistLayout,
  UserLayout,
} from '@components/index';
import {
  Login,
  Home,
  Search,
  Stats,
  CurrentUserProfile,
  CurrentUserLibrary,
  CurrentUserSavedSongs,
  CurrentUserFollowedArtists,
  CurrentUserSavedAlbums,
  CurrentUserPlaylists,
  AlbumDetails,
  ArtistProfile,
  ArtistCatalogCategory,
  PlaylistDetails,
  UserProfile,
  UserPlaylists,
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
        path: 'library',
        element: <CurrentUserLibrary />,
      },
      {
        path: 'library/saved-songs',
        element: <CurrentUserSavedSongs />,
      },
      {
        path: 'library/followed-artists',
        element: <CurrentUserFollowedArtists />,
      },
      {
        path: 'library/saved-albums',
        element: <CurrentUserSavedAlbums />,
      },
      {
        path: 'artist',
        element: <ArtistLayout />,
        children: [
          {
            path: ':id',
            element: <ArtistProfile />,
          },
          {
            path: ':id/albums',
            element: <ArtistCatalogCategory />,
          },
          {
            path: ':id/singles',
            element: <ArtistCatalogCategory />,
          },
          {
            path: ':id/compilations',
            element: <ArtistCatalogCategory />,
          },
          {
            path: ':id/appears-on',
            element: <ArtistCatalogCategory />,
          },
        ],
      },
      {
        path: 'albums/:id',
        element: <AlbumDetails />,
      },
      {
        path: 'library/playlists',
        element: <CurrentUserPlaylists />,
      },
      {
        path: 'playlist/:id',
        element: <PlaylistDetails />,
      },
      {
        path: 'user-profile',
        element: <UserLayout />,
        children: [
          {
            path: ':id',
            element: <UserProfile />,
          },
          {
            path: ':id/playlists',
            element: <UserPlaylists />,
          },
        ],
      },
      {
        path: 'profile',
        element: <CurrentUserProfile />,
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
