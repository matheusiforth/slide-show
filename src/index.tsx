import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';



import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';

import { FilterContextProvider } from './contexts/filter';
import { CurrentLinesProvider } from './contexts/current-lines';

import { Provider as AdobeProvider, defaultTheme } from '@adobe/react-spectrum';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <AdobeProvider theme={defaultTheme}>
      <QueryClientProvider client={queryClient}>

        <FilterContextProvider>
          <CurrentLinesProvider>
            <App />
          </CurrentLinesProvider>
        </FilterContextProvider>

      </QueryClientProvider>
    </AdobeProvider>
  </React.StrictMode>
);
