import { useQueries } from '@tanstack/react-query';
import { Api } from '@common/utils';
import {
  CurrentUserResponse,
  CurrentUserFollowedArtistsResponse,
} from '@common/interfaces';
// import { useStore } from '@store/index';

const handleGetCurrentUserData = async (): Promise<CurrentUserResponse> => {
  const response = await Api.get<CurrentUserResponse>(`/me`);

  return response;
};

const handleGetCurrentUserFollowedArtists =
  async (): Promise<CurrentUserFollowedArtistsResponse> => {
    const response = await Api.get<CurrentUserFollowedArtistsResponse>(
      '/me/following?type=artist&limit=1'
    );

    return response;
  };

export const useGetCurrentUserData = (userId?: string) => {
  // const setCurrentUser = useStore((state) => state.setCurrentUser);

  return useQueries({
    queries: [
      {
        queryKey: ['getCurrentUserData', userId],
        queryFn: handleGetCurrentUserData,
      },
      {
        queryKey: ['getCurrentUserArtists', userId],
        queryFn: handleGetCurrentUserFollowedArtists,
      },
    ],
    combine: (results) => {
      return {
        data: { ...results?.[0]?.data, ...results?.[1]?.data },
        pending: results.some((result) => result.isPending),
        isFetching: results.some((result) => result.isFetching),
        isError: results.some((result) => result.isError),
        isSuccess: results.every((result) => result.isSuccess),
      };
    },
  });

  // return useQuery(['getUserData', userId], handleGetCurrentUserData, {
  //   onSuccess: (data) => {
  //     setCurrentUser(data);
  //   },
  // });
};
