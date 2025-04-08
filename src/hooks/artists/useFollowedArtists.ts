/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useStore } from '@store/index';
import { useGetCurrentUserFollowedArtists } from '@services/artists';

export const useFollowedArtists = () => {
  const { ref, inView } = useInView();
  const artistData = useStore((state) => state.artists);
  const after = useStore((state) => state.after);
  const total = useStore((state) => state.total);
  const setArtistsData = useStore((state) => state.setArtistsData);
  const setAfter = useStore((state) => state.setAfter);
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
