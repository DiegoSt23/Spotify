import { useParams } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { useGetAlbumDetails, useCheckIsAlbumSaved } from '@services/albums';
import { Page } from '@components/layout';
import { AlbumDetails as AlbumDetailsTemplate } from '@components/albums';
import { Loading } from '@components/common';

export const AlbumDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isFetching } = useGetAlbumDetails(id);
  const { data: isAlbumSaved, isFetching: isFetchingIsAlbumSaved } =
    useCheckIsAlbumSaved(id);

  if (isFetching || isFetchingIsAlbumSaved) {
    return <Loading />;
  }

  return (
    <Page
      title={data?.name}
      headerElement={
        <IconButton sx={{ position: 'relative', right: 4 }}>
          <MoreVert />
        </IconButton>
      }
    >
      <AlbumDetailsTemplate {...data} isSaved={isAlbumSaved?.[0]} />
    </Page>
  );
};
