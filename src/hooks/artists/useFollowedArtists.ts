/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useStore } from '@store/index';
import { useGetCurrentUserFollowedArtists } from '@services/artists';

export const useFollowedArtists = () => {
  const { ref, inView } = useInView();
  const artistData = useStore((state) => state.followedArtists.artists);
  const after = useStore((state) => state.followedArtists.after);
  const total = useStore((state) => state.followedArtists.total);
  const setArtistsData = useStore(
    (state) => state.followedArtists.setArtists
  );
  const setAfter = useStore((state) => state.followedArtists.setAfter);
  const { data, isFetching } = useGetCurrentUserFollowedArtists(after);

  useEffect(() => {
    if (inView && data?.artists?.cursors?.after) {
      setAfter(data.artists.cursors.after);
    }
  }, [inView]);

  useEffect(() => {
    if (data?.artists?.items) {
      setArtistsData({
        artists: [...artistData, ...data.artists.items],
        total: data?.artists?.total,
      });
    }
  }, [data?.artists?.items]);

  return {
    ref,
    artistData,
    isFetching,
    total,
    loadingFirstTime: !artistData.length && isFetching,
  };
};
