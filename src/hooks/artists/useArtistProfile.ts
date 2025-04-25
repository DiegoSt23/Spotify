import { useState, type MouseEvent } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ArtistExtended, ContextMenuPosition, Track } from '@common/interfaces';
import { useStore } from '@store/index';
import {
  useGetArtistBio,
  useGetArtistTopTracks,
  useGetArtistPartialAlbums,
  useCheckIsArtistFollowed,
  useFollow,
  useUnfollow,
} from '@services/artists';
import { type ArtistContext } from '@components/artists';

export const useArtistProfile = () => {
  // store
  const artists = useStore((state) => state.followedArtists.artists);
  const totalArtists = useStore((state) => state.followedArtists.total);
  const after = useStore((state) => state.followedArtists.after);
  const setArtistsData = useStore(
    (state) => state.followedArtists.setArtistsData
  );
  // mutations
  const {
    mutate: handleFollow,
    isPending: loadingFollow,
    isSuccess: isFollowSuccess,
  } = useFollow();
  const {
    mutate: handleUnfollow,
    isPending: loadingUnfollow,
    isSuccess: isUnfollowSuccess,
  } = useUnfollow();
  // queries
  const { id, artistData, isFetchingArtistData } =
    useOutletContext<ArtistContext>();
  const { data: topTracks, isFetching: isFetchingTopTracks } =
    useGetArtistTopTracks(id);
  const { data: partialAlbums, isFetching: isFetchingPartialAlbums } =
    useGetArtistPartialAlbums(id);
  const { data: isArtistFollowed } = useCheckIsArtistFollowed(
    id,
    isFollowSuccess,
    isUnfollowSuccess
  );
  const { data: bioData, isFetching: isFetchingBio } = useGetArtistBio(
    artistData?.name
  );
  // state variables
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [contextMenuPosition, setContextMenuPosition] =
    useState<ContextMenuPosition | null>(null);
  const isLoading =
    isFetchingArtistData ||
    isFetchingBio ||
    isFetchingTopTracks ||
    isFetchingPartialAlbums;

  const handleOpenContextMenu = (
    event: MouseEvent<HTMLDivElement | HTMLButtonElement>,
    id: string
  ) => {
    event.preventDefault();
     const track = topTracks?.tracks?.find((track) => track.id === id);

     if (!track) return;

    setSelectedTrack(track);
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
    setSelectedTrack(null);
  };

  const handleFollowUnfollowArtist = () => {
    if (isArtistFollowed?.[0]) {
      handleUnfollow({ id: id ?? '', type: 'artist', name: artistData?.name ?? '' });

       if (artists?.length && artists.some((artist) => artist.id === id)) {
        const updatedArtists = artists.filter((artist) => artist.id !== id);

        setArtistsData({
          artists: updatedArtists,
          total: totalArtists - 1,
          after,
        });
       }
    } else {
      handleFollow({
        id: id ?? '',
        type: 'artist',
        name: artistData?.name ?? '',
      });

      if (artists?.length) {
        setArtistsData({
          artists: [artistData as ArtistExtended, ...artists],
          total: totalArtists + 1,
          after,
        });
      }
    }
  };

  const handlePlayArtist = () => {
    console.log('Play artist');
  };

  return {
    artistData,
    topTracks,
    partialAlbums,
    isArtistFollowed,
    bioData,
    isLoading,
    isLoadingFollowUnfollow: loadingFollow || loadingUnfollow,
    contextMenuPosition,
    selectedTrack,
    handleOpenContextMenu,
    handleCloseContextMenu,
    handleFollowUnfollowArtist,
    handlePlayArtist,
  };
};
