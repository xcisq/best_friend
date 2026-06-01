import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { CraftUiShowcase } from './CraftUiShowcase';
import './index.css';

const Page = window.location.pathname === '/ui' ? CraftUiShowcase : App;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Page />
  </StrictMode>,
);
