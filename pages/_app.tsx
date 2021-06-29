import { ReactNode } from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";

import store from "@/store";
import { addProgressBar } from "@/utils";
import { useLoginWithToken } from "@/hooks";

import "@/styles/globals.scss";
import "@/styles/nprogress.scss";

const App = ({ Component, pageProps }: AppProps): ReactNode => {
  addProgressBar();

  const LogInWithToken = () => {
    useLoginWithToken();
    return <></>;
  };

  return (
    <Provider store={store}>
      <LogInWithToken />
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
