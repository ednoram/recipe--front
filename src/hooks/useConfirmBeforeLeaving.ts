import { useEffect } from "react";
import Router from "next/router";

import { useIsLoggedIn } from "@/hooks";
import { handleRouteChange } from "@/utils";

const useConfirmBeforeLeaving = (): void => {
  const isLoggedIn = useIsLoggedIn();

  useEffect((): (() => void) => {
    if (isLoggedIn) {
      window.onbeforeunload = () => true;
      Router.events.on("routeChangeStart", handleRouteChange);
    }

    return () => {
      window.onbeforeunload = null;
      Router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);
};

export default useConfirmBeforeLeaving;
