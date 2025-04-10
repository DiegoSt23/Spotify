import { useQuery } from '@tanstack/react-query';
import { Api } from '@common/utils';
import { AlbumTracksResponse } from '@common/interfaces';

const handleGetAlbumTracks = async (
  offset?: number | null,
  id?: string
): Promise<AlbumTracksResponse> => {
  const response = await Api.get<AlbumTracksResponse>(
    `albums/${id}/tracks?limit=50&offset=${offset}`
  );

  return response;
};

export const useGetAlbumTracks = (offset: number | null, id?: string) =>
  useQuery({
    queryKey: ['getAlbumTracks', offset],
    queryFn: () => handleGetAlbumTracks(offset, id),
    enabled: offset !== null && offset !== 0,
  });
