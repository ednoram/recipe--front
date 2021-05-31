import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { loginWithToken } from "@/store/actions";
import { selectUserData } from "@/store/selectors";

const useLoginWithToken = (): void => {
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!userData && token) {
      dispatch(loginWithToken(token));
    }
  }, [userData]);
};

export default useLoginWithToken;
