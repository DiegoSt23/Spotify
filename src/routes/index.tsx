import { createBrowserRouter } from 'react-router-dom';
import {
  PrivateRoute,
  Dashboard,
  ArtistLayout,
  PlaylistsLayout,
} from '@components/index';
import {
  Login,
  Home,
  Search,
  Stats,
  SavedSongs,
  FollowedArtists,
  SavedAlbums,
  CurrentUserPlaylists,
  AlbumDetails,
  ArtistProfile,
  ArtistAlbums,
  ArtistSingles,
  ArtistCompilations,
  ArtistAppearsOn,
  PlaylistDetails,
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
        element: <SavedSongs />,
      },
      {
        path: 'followed-artists',
        element: <FollowedArtists />,
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
        path: 'saved-albums',
        element: <SavedAlbums />,
      },
      {
        path: 'albums/:id',
        element: <AlbumDetails />,
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
