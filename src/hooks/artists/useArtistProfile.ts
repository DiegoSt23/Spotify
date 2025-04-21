import { useState, type MouseEvent } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ContextMenuPosition, TrackContext } from '@common/interfaces';
import {
  useGetArtistBio,
  useGetArtistTopTracks,
  useGetArtistPartialAlbums,
  useCheckIsArtistFollowed,
} from '@services/artists';
import { type ArtistContext } from '@components/artists';

const initialTrackContext: TrackContext = {
  id: '',
  name: '',
  artists: '',
};

export const useArtistProfile = () => {
  const { id, artistData, isFetchingArtistData } =
    useOutletContext<ArtistContext>();
  const { data: topTracks, isFetching: isFetchingTopTracks } =
    useGetArtistTopTracks(id);
  const { data: partialAlbums, isFetching: isFetchingPartialAlbums } =
    useGetArtistPartialAlbums(id);
  const { data: isArtistFollowed, isFetching: isFetchingIsArtistFollowed } =
    useCheckIsArtistFollowed(id);
  const { data: bioData, isFetching: isFetchingBio } = useGetArtistBio(
    artistData?.name
  );
  const [trackContext, setTrackContext] =
    useState<TrackContext>(initialTrackContext);
  const [contextMenuPosition, setContextMenuPosition] =
    useState<ContextMenuPosition | null>(null);
  const isLoading =
    isFetchingArtistData ||
    isFetchingBio ||
    isFetchingTopTracks ||
    isFetchingPartialAlbums ||
    isFetchingIsArtistFollowed;

  const handleOpenContextMenu = (
    event: MouseEvent<HTMLDivElement | HTMLButtonElement>,
    id: string
  ) => {
    event.preventDefault();

    const name =
      topTracks?.tracks?.find((track) => track.id === id)?.name ?? '';
    const artists =
      topTracks?.tracks
        ?.find((track) => track.id === id)
        ?.artists?.map((artist) => artist.name)
        ?.join(', ') ?? '';

    setTrackContext({
      id: id ?? '',
      name,
      artists,
    });
    setContextMenuPosition(
      contextMenuPosition === null
        ? {
            top: event.clientY - 6,
            left: event.clientX + 2,
          }
        : null
    );
  };

  const handleCloseContextMenu = () => {
    setContextMenuPosition(null);
    setTrackContext(initialTrackContext);
  };

  // general actions
  const handleFollowUnfollowArtist = () => {
    console.log(isArtistFollowed ? 'Unfollow artist' : ' Follow artist');
  };

  const handlePlayArtist = () => {
    console.log('Play artist');
  };

  // track actions
  const handleAddTrack = () => {
    console.log('Add track', trackContext.id);
  };

  const handleAddTrackToQueue = () => {
    console.log('Add to queue', trackContext.id);
  };

  const handleAddTrackToPlaylist = () => {
    console.log('Add track to playlist', trackContext.id);
  };

  const handleCopyTrackLink = () => {
    console.log('Copy track link', trackContext.id);
  };

  return {
    artistData,
    topTracks,
    partialAlbums,
    isArtistFollowed,
    bioData,
    isLoading,
    contextMenuPosition,
    trackContext,
    handleOpenContextMenu,
    handleCloseContextMenu,
    handleFollowUnfollowArtist,
    handlePlayArtist,
    handleAddTrack,
    handleAddTrackToQueue,
    handleAddTrackToPlaylist,
    handleCopyTrackLink,
  };
};
