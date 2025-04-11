/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { type Playlist } from '@common/interfaces'
import { UserContext } from '@components/users';
import { useGetUserPlaylists } from '@services/playlists';

export const useUserPlaylists = () => {
  const { ref, inView } = useInView();
  const { id, isFetchingUserData } = useOutletContext<UserContext>();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [offset, setOffset] = useState<number | null>(0);
  const { data, refetch, isFetching, isFetchedAfterMount } =
    useGetUserPlaylists(offset, id, 50);

  useEffect(() => {
    if (inView && offset) {
      refetch();
    }
  }, [inView]);

  useEffect(() => {
    if (data && isFetchedAfterMount) {
      setPlaylists([...playlists, ...(data?.items || [])]);
      setOffset(data?.next ? (offset as number) + 50 : null);
    }
  }, [data, isFetchedAfterMount]);

  return {
    ref,
    playlists,
    isFetching: isFetching || isFetchingUserData,
    loadingFirstTime: !playlists.length && isFetching,
  };
};
