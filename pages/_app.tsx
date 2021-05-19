import { ReactNode } from "react";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";

import store from "@/store";
import "@/styles/globals.scss";

const App = ({ Component, pageProps }: AppProps): ReactNode => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
