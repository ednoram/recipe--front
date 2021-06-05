import { API, MY_ACCOUNT_ROUTE } from "@/constants";
import { processErrors } from "@/utils";
import { UserData, Dispatch } from "@/types";

import { SET_USER_DATA } from "../reducers/user";

const setUserData = (data: UserData | null) => ({
  type: SET_USER_DATA,
  payload: { data },
});

export const loginUser =
  (
    body: { email: string; password: string },
    updateErrors: {
      (errors: Array<string>): void;
    }
  ) =>
  (dispatch: Dispatch): void => {
    API.post("/api/user/login", body)
      .then((res) => {
        updateErrors([]);
        localStorage.setItem("token", res.data.token);
        dispatch(setUserData(res.data.data));
      })
      .catch((err) => updateErrors(processErrors(err)));
  };

export const registerUser =
  (
    body: {
      name: string;
      email: string;
      password: string;
      passwordConfirmation: string;
    },
    updateErrors: {
      (errors: Array<string>): void;
    }
  ) =>
  (dispatch: Dispatch): void => {
    API.post("/api/user/register", body)
      .then(() => {
        const { email, password } = body;
        dispatch(loginUser({ email, password }, updateErrors));
      })
      .catch((err) => updateErrors(processErrors(err)));
  };

export const logoutUser =
  () =>
  (dispatch: Dispatch): void => {
    dispatch(setUserData(null));
    localStorage.clear();
    location.href = "/";
  };

export const loginWithToken =
  (token: string) =>
  (dispatch: Dispatch): void => {
    API.post("/api/user/login-with-token", { token })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        dispatch(setUserData(res.data.data));
      })
      .catch(() => dispatch(logoutUser()));
  };

export const patchUser =
  (
    id: string,
    body: {
      name: string;
    },
    updateErrors: {
      (errors: Array<string>): void;
    }
  ) =>
  (dispatch: Dispatch): void => {
    API.patch(`api/user/${id}`, {
      ...body,
      token: localStorage.getItem("token"),
    })
      .then((res) => {
        dispatch(setUserData(res.data));
        location.href = MY_ACCOUNT_ROUTE;
      })
      .catch((err) => updateErrors(processErrors(err)));
  };

export const changeUserPassword =
  (
    id: string,
    body: {
      newPassword: string;
      currentPassword: string;
      passwordConfirmation: string;
    },
    updateErrors: {
      (errors: Array<string>): void;
    }
  ) =>
  (dispatch: Dispatch): void => {
    API.patch(`api/user/${id}/password`, {
      ...body,
      token: localStorage.getItem("token"),
    })
      .then((res) => {
        dispatch(setUserData(res.data));
        location.href = MY_ACCOUNT_ROUTE;
      })
      .catch((err) => updateErrors(processErrors(err)));
  };
