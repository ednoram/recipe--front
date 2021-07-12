import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useIsLoggedIn } from "@/hooks";
import { loginWithToken } from "@/store/actions";

const useLoginWithToken = (): void => {
  const dispatch = useDispatch();
  const isLoggedIn = useIsLoggedIn();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(loginWithToken());
    }
  }, [isLoggedIn]);
};

export default useLoginWithToken;
