import { useQuery } from '@tanstack/react-query';
import { Api } from '@common/utils';
import { ArtistBioResponse } from '@common/interfaces';

const handleGetArtistBio = async (
  artist?: string
): Promise<ArtistBioResponse> => {
  const response = await Api.get<ArtistBioResponse>(
    `/?method=artist.getinfo&artist=${artist}&api_key=513f082c13faf6701b549a9e27976973&format=json`,
    true
  );

  return response;
};

export const useGetArtistBio = (artist?: string) =>
  useQuery({
    queryKey: ['getArtistBio', artist],
    enabled: !!artist,
    queryFn: () => handleGetArtistBio(artist),
  });
