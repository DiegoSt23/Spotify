/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { type Album } from '@common/interfaces';
import { type ArtistContext } from '@components/artists';
import { useGetArtistCatalog } from '@services/artists';

export const useArtistCatalogCategory = () => {
  const { ref, inView } = useInView();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [offset, setOffset] = useState<number | null>(0);
  const { id, isFetchingArtistData, category } = useOutletContext<ArtistContext>();
  const { data, refetch, isFetching, isFetchedAfterMount } =
    useGetArtistCatalog(offset, id, 50, category);
  console.log(category);

  useEffect(() => {
    if (inView && offset) {
      refetch();
    }
  }, [inView]);

  useEffect(() => {
    if (data && isFetchedAfterMount) {
      setAlbums([...albums, ...(data?.items || [])]);
      setOffset(data?.next ? (offset as number) + 50 : null);
    }
  }, [data, isFetchedAfterMount]);

  return {
    ref,
    albums,
    isLoading: isFetching || isFetchingArtistData,
    isLoadingFirstTime: !albums.length && isFetching,
  };
};
