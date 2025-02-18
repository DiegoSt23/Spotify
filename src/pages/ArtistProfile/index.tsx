import { useParams } from 'react-router-dom';
import {
  useGetArtistDetails,
  useGetArtistBio,
  useGetArtistTopTracks,
  useGetArtistPartialAlbums,
  useCheckIsArtistFollowed,
} from '@hooks/artists';
import { ArtistProfile as ArtistProfileTemplate } from '@components/artists';
import { Loading } from '@components/common';

export const ArtistProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isFetching } = useGetArtistDetails(id);
  const { data: topTracks, isFetching: isFetchingTopTracks } = useGetArtistTopTracks(id);
  const { data: partialAlbums, isFetching: isFetchingPartialAlbums } =
    useGetArtistPartialAlbums(id);
  const { data: isArtistFollowed, isFetching: isFetchingIsArtistFollowed } =
    useCheckIsArtistFollowed(id);
  const { data: bioData, isFetching: isFetchingBio } = useGetArtistBio(data?.name);

  if (
    isFetching ||
    isFetchingBio ||
    isFetchingTopTracks ||
    isFetchingPartialAlbums ||
    isFetchingIsArtistFollowed
  ) {
    return <Loading />;
  }

  return (
    <ArtistProfileTemplate
      {...data}
      {...bioData}
      {...topTracks}
      {...partialAlbums}
      isFollowed={isArtistFollowed?.[0]}
    />
  );
};
