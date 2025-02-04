import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

export const useGetAccessToken = () => {
  const location = useLocation();

  useEffect(() => {
    const getTokenFromUrl = () => {
      return location.hash
        .substring(1)
        .split('&')
        .reduce((initial: Record<string, string>, item) => {
          const parts: string[] = item.split('=');
          initial[parts[0]] = decodeURIComponent(parts[1]);
  
          return initial;
        }, {});
    };
    const tokens = getTokenFromUrl();
    Cookies.set('token', tokens?.access_token || '');
  }, [location]);
};
