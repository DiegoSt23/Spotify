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
  CurrentUserSavedSongs,
  CurrentUserFollowedArtists,
  CurrentUserSavedAlbums,
  CurrentUserPlaylists,
  AlbumDetails,
  ArtistProfile,
  ArtistAlbums,
  ArtistSingles,
  ArtistCompilations,
  ArtistAppearsOn,
  PlaylistDetails,
  UserProfile,
  UserPlaylists,
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
        path: 'saved-songs',
        element: <CurrentUserSavedSongs />,
      },
      {
        path: 'followed-artists',
        element: <CurrentUserFollowedArtists />,
      },
      {
        path: 'saved-albums',
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
        path: 'albums/:id',
        element: <AlbumDetails />,
      },
      {
        path: 'playlists',
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
