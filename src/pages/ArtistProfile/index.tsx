import { useOutletContext } from 'react-router-dom';
import {
  useGetArtistBio,
  useGetArtistTopTracks,
  useGetArtistPartialAlbums,
  useCheckIsArtistFollowed,
} from '@services/artists';
import { type ArtistContext } from '@components/artists';
import { ArtistProfile as ArtistProfileTemplate } from '@components/artists';

export const ArtistProfile = () => {
  const { id, artistData, isFetchingArtistData } =
    useOutletContext<ArtistContext>();
  const { data: topTracks, isFetching: isFetchingTopTracks } =
    useGetArtistTopTracks(id);
  const { data: partialAlbums, isFetching: isFetchingPartialAlbums } =
    useGetArtistPartialAlbums(id);
  const { data: isArtistFollowed, isFetching: isFetchingIsArtistFollowed } =
    useCheckIsArtistFollowed(id);
  const { data: bioData, isFetching: isFetchingBio } = useGetArtistBio(
    artistData?.name
  );
  const isLoading =
    isFetchingArtistData ||
    isFetchingBio ||
    isFetchingTopTracks ||
    isFetchingPartialAlbums ||
    isFetchingIsArtistFollowed;

  return (
    <ArtistProfileTemplate
      {...artistData}
      {...bioData}
      {...topTracks}
      {...partialAlbums}
      isFollowed={isArtistFollowed?.[0]}
      isLoading={isLoading}
    />
  );
};
