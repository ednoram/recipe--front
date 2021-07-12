import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { loginWithToken } from "@/store/actions";
import { selectUserData } from "@/store/selectors";

const useLoginWithToken = (): void => {
  const user = useSelector(selectUserData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(loginWithToken());
    }
  }, [user]);
};

export default useLoginWithToken;
