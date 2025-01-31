import { createBrowserRouter } from 'react-router-dom';
import { StyleGuide, Login } from '@pages/index';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/style-guide',
    element: <StyleGuide />,
  },
  {
    path: '*',
    element: <p>404</p>,
  },
]);
