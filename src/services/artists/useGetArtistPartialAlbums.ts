import { useQueries } from '@tanstack/react-query';
import { handleGetArtistCatalog } from './useGetArtistCatalog';

export const useGetArtistPartialAlbums = (id?: string) =>
  useQueries({
    queries: [
      {
        queryKey: ['getPartialArtistAlbums', id],
        queryFn: () => handleGetArtistCatalog(id, 10, 'album'),
      },
      {
        queryKey: ['getPartialArtistSingles', id],
        queryFn: () => handleGetArtistCatalog(id, 10, 'single'),
      },
      {
        queryKey: ['getPartialArtistCompilations', id],
        queryFn: () => handleGetArtistCatalog(id, 10, 'compilation'),
      },
      {
        queryKey: ['getPartialArtistAppearsOn', id],
        queryFn: () => handleGetArtistCatalog(id, 10, 'appears_on'),
      },
    ],
    combine: (results) => {
      return {
        data: {
          albums: results[0].data,
          singles: results[1].data,
          compilations: results[2].data,
          appearsOn: results[3].data,
        },
        pending: results.some((result) => result.isPending),
        isFetching: results.some((result) => result.isFetching),
        isError: results.some((result) => result.isError),
        isSuccess: results.every((result) => result.isSuccess),
      };
    },
  });
