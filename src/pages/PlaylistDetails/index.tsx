import { useParams } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import {
  useGetPlaylistDetails,
  useCheckIsPlaylistSaved,
} from '@hooks/playlists';
import { Page } from '@components/layout';
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

  return (
    <Page
      title={data?.name}
      headerElement={
        <IconButton sx={{ position: 'relative', right: 4 }}>
          <MoreVert />
        </IconButton>
      }
    >
      <PlaylistDetailsTemplate {...data} isSaved={isPlaylistSaved?.[0]} />
    </Page>
  );
};
