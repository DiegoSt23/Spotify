import { useParams } from 'react-router-dom';
import { useGetPlaylistDetails } from '@hooks/playlists';
import { PlaylistDetails as PlaylistDetailsTemplate } from '@components/playlists';
import { Loading } from '@components/common';

export const PlaylistDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isFetching } = useGetPlaylistDetails(id);

  if (isFetching) {
    return <Loading />;
  }

  return <PlaylistDetailsTemplate {...data} />;
};
