import { useQuery } from '@tanstack/react-query';
import { Api } from '@common/utils';
import { UserResponse } from '@common/interfaces';

const handleGetPUserData = async (id?: string): Promise<UserResponse> => {
  const response = await Api.get<UserResponse>(`users/${id}`);

  return response;
};

export const useGetUserData = (id?: string) =>
  useQuery({
    queryKey: ['getUserData', id],
    queryFn: () => handleGetPUserData(id),
    enabled: !!id,
  });
