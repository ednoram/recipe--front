import { Router } from "next/router";

const confirmMessage =
  "Are you sure you want to leave page? Information you've entered will be lost.";

const handleRouteChange = (): void => {
  if (!confirm(confirmMessage)) {
    Router.events.emit("routeChangeError");
    throw "Route Change aborted. This error can be safely ignored.";
  }
};

export default handleRouteChange;
