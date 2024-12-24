import './style.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import './index.css';
import App from './App';
import ReactModal from 'react-modal';

// ReactModal.setAppElement('#app');

// const rootElement = document.getElementById('app') as HTMLElement;
const rootElement = document.getElementById('app');

if (!rootElement) {
  throw new Error("Root element with id 'app' not found");
}

ReactModal.setAppElement(rootElement);

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);