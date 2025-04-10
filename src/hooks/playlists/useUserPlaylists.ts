/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useStore } from '@store/index';
import { useGetCurrentUserPlaylists } from '@services/playlists';

export const useUserPlaylists = () => {
  const { ref, inView } = useInView();
  const playlists = useStore((state) => state.userPlaylists.playlists);
  const total = useStore((state) => state.userPlaylists.total);
  const offset = useStore((state) => state.userPlaylists.offset);
  const setPlaylistsData = useStore(
    (state) => state.userPlaylists.setPlaylistsData
  );
  const { data, refetch, isFetching, isFetchedAfterMount } =
    useGetCurrentUserPlaylists(offset);

  useEffect(() => {
    if (inView && offset) {
      refetch();
    }
  }, [inView]);

  useEffect(() => {
    if (data && isFetchedAfterMount) {
      setPlaylistsData({
        playlists: [...playlists, ...(data?.items || [])],
        total: data?.total || 0,
        offset: data?.next ? (offset as number) + 50 : null,
      });
    }
  }, [data, isFetchedAfterMount]);

  return {
    ref,
    playlists,
    total,
    isFetching,
    loadingFirstTime: !playlists.length && isFetching,
  };
};
