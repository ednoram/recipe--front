import { useState, useEffect } from "react";

const useIsLoggedIn = (): boolean => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("isLoggedIn")) {
      setIsLoggedIn(true);
    }
  }, []);

  return isLoggedIn;
};

export default useIsLoggedIn;
