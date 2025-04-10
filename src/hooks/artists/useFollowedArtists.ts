/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useStore } from '@store/index';
import { useGetCurrentUserFollowedArtists } from '@services/artists';

export const useFollowedArtists = () => {
  const { ref, inView } = useInView();
  const artists = useStore((state) => state.followedArtists.artists);
  const after = useStore((state) => state.followedArtists.after);
  const total = useStore((state) => state.followedArtists.total);
  const setArtistsData = useStore(
    (state) => state.followedArtists.setArtistsData
  );
  const { data, refetch, isFetching, isFetchedAfterMount } = useGetCurrentUserFollowedArtists(after);

  useEffect(() => {
    if (inView && after) {
      refetch();
    }
  }, [inView]);

  useEffect(() => {
    if (data && isFetchedAfterMount) {
      setArtistsData({
        artists: [...artists, ...data.artists.items],
        total: data?.artists?.total,
        after: data?.artists?.cursors?.after ?? null,
      });
    }
  }, [data, isFetchedAfterMount]);

  return {
    ref,
    artists,
    isFetching,
    total,
    loadingFirstTime: !artists.length && isFetching,
  };
};
