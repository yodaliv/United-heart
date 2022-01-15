import React, { Suspense } from 'react';
import { CookiesProvider } from 'react-cookie';

import AppContextProvider from './context/AppContext';
import UserContextProvider from './context/UserContext';
import Views from './views';

import './assets/scss/custom.scss';
import './i18n';

function App() {
  return (
    <CookiesProvider>
      <AppContextProvider>
        <UserContextProvider>
          <Suspense fallback={null}>
            <Views />
          </Suspense>
        </UserContextProvider>
      </AppContextProvider>
    </CookiesProvider>
  );
}

export default App;
