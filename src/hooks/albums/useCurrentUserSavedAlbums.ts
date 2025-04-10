/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useStore } from '@store/index';
import { useGetCurrentUserSavedAlbums } from '@services/albums';

export const useCurrentUserSavedAlbums = () => {
  const { ref, inView } = useInView();
  const albums = useStore((state) => state.savedAlbums.albums);
  const total = useStore((state) => state.savedAlbums.total);
  const offset = useStore((state) => state.savedAlbums.offset);
  const setAlbumsData = useStore(
    (state) => state.savedAlbums.setAlbumsData
  );
  const { data, refetch, isFetching, isFetchedAfterMount } = useGetCurrentUserSavedAlbums(offset);

  useEffect(() => {
    if (inView && offset) {
      refetch();
    }
  }, [inView]);

  useEffect(() => {
    if (data && isFetchedAfterMount) {
      setAlbumsData({
        albums: [...albums, ...(data?.items.map((item) => item.album) || [])],
        total: data?.total || 0,
        offset: data?.next ? (offset as number) + 50 : null,
      });
    }
  }, [data, isFetchedAfterMount]);

  return {
    ref,
    albums,
    total,
    isFetching,
    loadingFirstTime: !albums.length && isFetching,
  };
};
