import { useState, useEffect } from "react";

const useIsLoggedIn = (): boolean => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  return isLoggedIn;
};

export default useIsLoggedIn;
