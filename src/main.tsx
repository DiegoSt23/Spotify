import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from '@emotion/react';
import { i18n } from '@language/index.ts';
import { light, dark } from '@theme/index.ts';
import { App } from './App.tsx';
import './index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={light}>
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </I18nextProvider>
  </StrictMode>
);
