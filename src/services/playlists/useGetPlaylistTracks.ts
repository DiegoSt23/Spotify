import { useQuery } from '@tanstack/react-query';
import { Api } from '@common/utils';
import { PlaylistsTracksResponse } from '@common/interfaces';

const handleGetPlaylistTracks = async (
  offset?: number | null,
  id?: string
): Promise<PlaylistsTracksResponse> => {
  const response = await Api.get<PlaylistsTracksResponse>(
    `playlists/${id}/tracks?limit=50&offset=${offset}`
  );

  return response;
};

export const useGetPlaylistTracks = (offset: number | null, id?: string) =>
  useQuery({
    queryKey: ['getPlaylistTracks', offset, id],
    queryFn: () => handleGetPlaylistTracks(offset, id),
    enabled: offset !== null,
  });
