import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import App from './app/app';
// eslint-disable-next-line @nx/enforce-module-boundaries

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import {
  MODULES_SHARED_STORE_SRC_STORE_FEATURE_KEY,
  storeReducer,
} from '@karlo/modules/shared/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const store = configureStore({
  reducer: { [MODULES_SHARED_STORE_SRC_STORE_FEATURE_KEY]: storeReducer },
  // Additional middleware can be passed to this array
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
  // Optional Redux store enhancers
  // enhancers: [],
});

root.render(
  <Provider store={store}>
    <StrictMode>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </StrictMode>
  </Provider>,
);
