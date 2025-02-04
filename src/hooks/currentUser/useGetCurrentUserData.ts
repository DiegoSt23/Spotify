import { useQuery } from 'react-query';
import { Api } from '@common/utils';
import { CurrentUser } from '@common/interfaces';
import { useStore } from '@store/index';

const handleGetCurrentUserData = async (): Promise<CurrentUser> => {
  const response = await Api.get<CurrentUser>(`/me`);

  return response;
};

export const useGetCurrentUserData = () => {
  const setCurrentUser = useStore((state) => state.setCurrentUser);

  return useQuery('getUserData', handleGetCurrentUserData, {
    onSuccess: (data) => {
      setCurrentUser(data);
    },
  });
};
