import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { store } from './store/store.ts';
import { Provider } from 'react-redux';
import AppRoutes from './routes/AppRoutes.tsx';
import './index.css';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster richColors />
      <AppRoutes />
    </Provider>
  </StrictMode>
);
