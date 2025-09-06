import React from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";

import { DarkModeProvider } from "@/contexts/theme/DarkModeContext";
import queryClient from "@/configs/queryClient/queryClient";
import { store } from "@/stores/store";
import GlobalStyles from "@/styles/GlobalStyles";
import i18n from "@/configs/i18n/i18n";
import RootRouter from "@/routes/Root";

import { ToastStyled, DarkModeToggle } from "@/components";

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
              <DarkModeToggle />
            </BrowserRouter>
          </DarkModeProvider>
        </I18nextProvider>
        <ToastStyled
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
          }}
        />
      </Provider>
    </QueryClientProvider>
  );
}

export default React.memo(App);
