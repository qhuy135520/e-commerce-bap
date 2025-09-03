import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'

import { DarkModeProvider } from './contexts/theme/DarkModeContext'
import queryClient from './configs/queryClient/queryClient'
// import { store } from './stores'
import GlobalStyles from './styles/GlobalStyles'

import RootRouter from './routes/Root'
import i18n from './configs/i18n/i18n'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {/* <Provider store={store}> */}
        <I18nextProvider i18n={i18n}>
          <DarkModeProvider>
            <GlobalStyles />
            <BrowserRouter>
              <React.Suspense fallback={<>...loading</>}>
                <RootRouter />
              </React.Suspense>
            </BrowserRouter>
          </DarkModeProvider>
        </I18nextProvider>
      {/* </Provider> */}
    </QueryClientProvider>
  )
}

export default React.memo(App)

