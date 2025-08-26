import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ToastContainer from './utils/toaster/ToastContainer.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <ToastContainer/>
    <App />
  </StrictMode>
);
