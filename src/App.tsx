import { RouterProvider } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from '@tanstack/react-query';
import { Toaster, toast } from 'sonner';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from '@theme/index.ts';
import { router } from './routes/index';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => toast.error(error.message),
  }),
});

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
      <Toaster position='top-right' />
    </ThemeProvider>
  </QueryClientProvider>
);
