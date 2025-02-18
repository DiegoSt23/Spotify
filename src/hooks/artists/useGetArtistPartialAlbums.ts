import { useQueries } from '@tanstack/react-query';
import { handleGetArtistAlbums } from './useGetArtistAlbums';
import { handleGetArtistSingles } from './useGetArtistSingles';
import { handleGetArtistCompilations } from './useGetArtistCompilations';
import { handleGetArtistAppearsOn } from './useGetArtistAppearsOn';

export const useGetArtistPartialAlbums = (id?: string) =>
  useQueries({
    queries: [
      {
        queryKey: ['getPartialArtistAlbums', id],
        queryFn: () => handleGetArtistAlbums(id),
      },
      {
        queryKey: ['getPartialArtistSingles', id],
        queryFn: () => handleGetArtistSingles(id),
      },
      {
        queryKey: ['getPartialArtistCompilations', id],
        queryFn: () => handleGetArtistCompilations(id),
      },
      {
        queryKey: ['getPartialArtistAppearsOn', id],
        queryFn: () => handleGetArtistAppearsOn(id),
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
