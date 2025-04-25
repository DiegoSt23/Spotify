import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { Toaster } from 'sonner';

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const accessToken = Cookies.get('token') || '';
  const isDarkTheme = useTheme().palette.mode === 'dark';

  if (!accessToken) {
    return <Navigate to='/login' replace />;
  }

  return (
    <>
      <Toaster
        position='top-right'
        theme={isDarkTheme ? 'dark' : 'light'}
        richColors
        offset={'1rem'}
      />
      {children}
    </>
  );
};
