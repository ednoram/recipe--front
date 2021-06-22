import { useEffect } from "react";
import Router from "next/router";

const useConfirmBeforeLeaving = (): void => {
  const confirmMessage =
    "Are you sure you want to leave page? Information you've entered will be lost.";
    
  useEffect((): (() => void) => {
    const handleRouterEvent = () => {
      if (!confirm(confirmMessage)) {
        Router.events.emit("routeChangeError");
        throw "Route Change aborted. This error can be safely ignored.";
      }
    };

    window.onbeforeunload = () => true;
    Router.events.on("routeChangeStart", handleRouterEvent);

    return () => {
      window.onbeforeunload = null;
      Router.events.off("routeChangeStart", handleRouterEvent);
    };
  }, []);
};

export default useConfirmBeforeLeaving;
