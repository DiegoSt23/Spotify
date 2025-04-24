import { useEffect, useState, type MouseEvent } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ArtistExtended, ContextMenuPosition, TrackContext } from '@common/interfaces';
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

const initialTrackContext: TrackContext = {
  id: '',
  name: '',
  artists: '',
};

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
    isSuccess: isSuccessFollowRequest,
  } = useFollow();
  const {
    mutate: handleUnfollow,
    isPending: loadingUnfollow,
    isSuccess: isSuccessUnfollowRequest,
  } = useUnfollow();
  // queries
  const { id, artistData, isFetchingArtistData } =
    useOutletContext<ArtistContext>();
  const { data: topTracks, isFetching: isFetchingTopTracks } =
    useGetArtistTopTracks(id);
  const { data: partialAlbums, isFetching: isFetchingPartialAlbums } =
    useGetArtistPartialAlbums(id);
  const { data: isArtistFollowed, refetch: checkIsArtistFollowed } =
    useCheckIsArtistFollowed(id);
  const { data: bioData, isFetching: isFetchingBio } = useGetArtistBio(
    artistData?.name
  );
  // state variables
  const [trackContext, setTrackContext] =
    useState<TrackContext>(initialTrackContext);
  const [contextMenuPosition, setContextMenuPosition] =
    useState<ContextMenuPosition | null>(null);
  const isLoading =
    isFetchingArtistData ||
    isFetchingBio ||
    isFetchingTopTracks ||
    isFetchingPartialAlbums;

  // context menu
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
    if (isArtistFollowed?.[0]) {
      handleUnfollow({ id: id ?? '', type: 'artist' });

       if (artists?.length && artists.some((artist) => artist.id === id)) {
        const updatedArtists = artists.filter((artist) => artist.id !== id);

        setArtistsData({
          artists: updatedArtists,
          total: totalArtists - 1,
          after,
        });
       }
    } else {
      handleFollow({ id: id ?? '', type: 'artist' });

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

  useEffect(() => {
    if (isSuccessFollowRequest || isSuccessUnfollowRequest) {
      checkIsArtistFollowed();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessFollowRequest, isSuccessUnfollowRequest]);

  return {
    artistData,
    topTracks,
    partialAlbums,
    isArtistFollowed,
    bioData,
    isLoading,
    isLoadingFollowUnfollow:
      loadingFollow || loadingUnfollow,
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
