import { useQuery } from '@tanstack/react-query';
import { Api } from '@common/utils';
import { ArtistTopTracksResponse } from '@common/interfaces';

const handleGetArtistTopTracks = async (
  id?: string
): Promise<ArtistTopTracksResponse> => {
  const response = await Api.get<ArtistTopTracksResponse>(
    `artists/${id}/top-tracks`
  );

  return response;
};

export const useGetArtistTopTracks = (id?: string) =>
  useQuery({
    queryKey: ['getArtistTopTracks', id],
    enabled: !!id,
    queryFn: () => handleGetArtistTopTracks(id),
  });
