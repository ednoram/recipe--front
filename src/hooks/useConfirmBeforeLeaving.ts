import { useEffect } from "react";
import Router from "next/router";

import { handleRouteChange } from "@/utils";

const useConfirmBeforeLeaving = (): void => {
  useEffect((): (() => void) => {
    window.onbeforeunload = () => true;
    Router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      window.onbeforeunload = null;
      Router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);
};

export default useConfirmBeforeLeaving;
