import { useParams } from 'react-router-dom';
import { useGetAlbumDetails } from '@hooks/albums';
import { AlbumDetails as AlbumDetailsTemplate } from '@components/albums';
import { Loading } from '@components/common';

export const AlbumDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isFetching } = useGetAlbumDetails(id);

  if (isFetching) {
    return <Loading />;
  }

  return <AlbumDetailsTemplate {...data} />;
};
