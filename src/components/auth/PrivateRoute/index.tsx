import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const accessToken = Cookies.get('token') || '';

  if (!accessToken) {
    return <Navigate to='/login' replace />;
  }

  return <>{children}</>;
};
