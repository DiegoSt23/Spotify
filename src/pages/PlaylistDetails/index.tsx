import { useParams } from 'react-router-dom';
import {
  useGetPlaylistDetails,
  useCheckIsPlaylistSaved,
} from '@hooks/playlists';
import { PlaylistDetails as PlaylistDetailsTemplate } from '@components/playlists';
import { Loading } from '@components/common';

export const PlaylistDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isFetching } = useGetPlaylistDetails(id);
  const { data: isPlaylistSaved, isFetching: isFetchingIsPlaylistSaved } =
    useCheckIsPlaylistSaved(id);

  if (isFetching || isFetchingIsPlaylistSaved) {
    return <Loading />;
  }

  return <PlaylistDetailsTemplate {...data} isSaved={isPlaylistSaved?.[0]} />;
};
