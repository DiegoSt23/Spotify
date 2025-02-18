import { useParams } from 'react-router-dom';
import { useGetAlbumDetails, useCheckIsAlbumSaved } from '@hooks/albums';
import { AlbumDetails as AlbumDetailsTemplate } from '@components/albums';
import { Loading } from '@components/common';

export const AlbumDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isFetching } = useGetAlbumDetails(id);
  const { data: isAlbumSaved, isFetching: isFetchingIsAlbumSaved } =
    useCheckIsAlbumSaved(id);
  console.log(isAlbumSaved);

  if (isFetching || isFetchingIsAlbumSaved) {
    return <Loading />;
  }

  return <AlbumDetailsTemplate {...data} isSaved={isAlbumSaved?.[0]} />;
};
