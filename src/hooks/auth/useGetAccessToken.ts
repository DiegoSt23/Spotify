import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Cookies from 'js-cookie';

export const useGetAccessToken = () => {
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get('access_token') || '';
  // const refreshToken = searchParams.get('refresh_token') || '';

  useEffect(() => {
    Cookies.set('token', accessToken);
  }, [accessToken]);
};
