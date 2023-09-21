import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MeuContextoProvider } from './util/context';

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  // <React.StrictMode>
  <MeuContextoProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </MeuContextoProvider>
  // </React.StrictMode>
);
// reportWebVitals();