import React from 'react'
import { BrowserRouter, Routes } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import { Toaster } from 'react-hot-toast'

import { DarkModeProvider } from './contexts/theme/DarkModeContext'
import queryClient from './configs/queryClient/queryClient'
import { store } from './stores'
import GlobalStyles from './styles/GlobalStyles'

import i18n from './configs/i18n/i18n'
import RootRouter from './routes/Root'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <DarkModeProvider>
            <GlobalStyles />
            <BrowserRouter>
              <RootRouter />
            </BrowserRouter>
          </DarkModeProvider>
        </I18nextProvider>
        <Toaster
          position='top-center'
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: '16px',
              maxWidth: '500px',
              padding: '16px 24px',
              backgroundColor: 'var(--color-grey-0)',
              color: 'var(--color-grey-700)',
            },
          }}
        />
      </Provider>
    </QueryClientProvider>
  )
}

export default React.memo(App)
