import { AxiosError } from "axios";
import {
  createAction,
  processErrors,
  setTokenCookie,
  removeTokenCookie,
} from "@/utils";
import {
  API,
  LOGIN_ROUTE,
  MY_ACCOUNT_ROUTE,
  VERIFY_ACCOUNT_ROUTE,
} from "@/constants";
import {
  SEND_EMAIL,
  SET_USER_DATA,
  REGISTER_USER,
  RESET_USER_PASSWORD,
} from "@/store/reducers/user";
import { getTokenCookie } from "@/lib";
import { UserData, Dispatch } from "@/types";

const setUserData = (data: UserData | null) =>
  createAction(SET_USER_DATA, { data });

const sendEmailAction = () => createAction(SEND_EMAIL, {});

const registerAction = () => createAction(REGISTER_USER, {});

const resetPasswordAction = () => createAction(RESET_USER_PASSWORD, {});

export const loginUser =
  (
    body: { email: string; password: string },
    setLoading: {
      (loading: boolean): void;
    },
    setErrors: {
      (errors: string[]): void;
    }
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      setErrors([]);
      setLoading(true);

      const { data } = await API.post("/api/user/login", body);

      setTokenCookie(data.token);
      localStorage.setItem("isLoggedIn", "true");
      dispatch(setUserData(data.user));

      setLoading(false);
      location.href = MY_ACCOUNT_ROUTE;
    } catch (err) {
      setLoading(false);
      setErrors(processErrors(err as AxiosError));
    }
  };

export const loginWithToken =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const token = getTokenCookie();
      const { data } = await API.post("/api/user/login-with-token", { token });

      if (data) {
        setTokenCookie(data.token);
        dispatch(setUserData(data.user));
        localStorage.setItem("isLoggedIn", "true");
      } else {
        dispatch(logoutUser());
      }
    } catch {
      dispatch(logoutUser());
    }
  };

export const logoutUser =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    removeTokenCookie();
    localStorage.removeItem("isLoggedIn");
    dispatch(setUserData(null));
    location.href = "/";
  };

export const registerUser =
  (
    body: {
      name: string;
      email: string;
      password: string;
      passwordConfirmation: string;
    },
    setLoading: {
      (loading: boolean): void;
    },
    setErrors: {
      (errors: string[]): void;
    }
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      setErrors([]);
      setLoading(true);

      await API.post("/api/user/register", body);

      dispatch(registerAction());
      setLoading(false);
      location.href = VERIFY_ACCOUNT_ROUTE;
    } catch (err) {
      setErrors(processErrors(err as AxiosError));
      setLoading(false);
    }
  };

export const patchUser =
  (
    id: string,
    body: {
      name: string;
    },
    setErrors: {
      (errors: string[]): void;
    }
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      setErrors([]);
      const token = getTokenCookie();

      const { data } = await API.patch(`api/user/${id}`, { ...body, token });

      dispatch(setUserData(data));
      location.href = MY_ACCOUNT_ROUTE;
    } catch (err) {
      setErrors(processErrors(err as AxiosError));
    }
  };

export const changeUserPassword =
  (
    id: string,
    body: {
      newPassword: string;
      currentPassword: string;
      passwordConfirmation: string;
    },
    setErrors: {
      (errors: string[]): void;
    }
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      setErrors([]);
      const token = getTokenCookie();

      const { data } = await API.patch(`api/user/${id}/password`, {
        ...body,
        token,
      });

      dispatch(setUserData(data));
      location.href = MY_ACCOUNT_ROUTE;
    } catch (err) {
      setErrors(processErrors(err as AxiosError));
    }
  };

export const deleteUser =
  (
    id: string,
    body: {
      password: string;
    },
    setErrors: {
      (errors: string[]): void;
    }
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      setErrors([]);
      const token = getTokenCookie();

      await API.delete(`api/user/${id}`, { data: { ...body, token } });

      dispatch(logoutUser());
    } catch (err) {
      setErrors(processErrors(err as AxiosError));
    }
  };

export const sendVerificationEmail =
  (
    email: string,
    setLoading: {
      (loading: boolean): void;
    },
    setErrors: {
      (errors: string[]): void;
    },
    setSuccess: {
      (success: string | null): void;
    }
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      setErrors([]);
      setLoading(true);

      await API.post("/api/user/send-verification", { email });

      dispatch(sendEmailAction());
      setSuccess("Email was sent");
      setLoading(false);
    } catch (err) {
      setSuccess(null);
      setErrors(processErrors(err as AxiosError));
      setLoading(false);
    }
  };

export const sendRecoveryEmail =
  (
    email: string,
    setLoading: {
      (loading: boolean): void;
    },
    setErrors: {
      (errors: string[]): void;
    },
    setSuccess: {
      (success: string | null): void;
    }
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      setErrors([]);
      setLoading(true);

      await API.post("/api/user/send-recovery", { email });

      dispatch(sendEmailAction());
      setSuccess("Email was sent");
      setLoading(false);
    } catch (err) {
      setSuccess(null);
      setErrors(processErrors(err as AxiosError));
      setLoading(false);
    }
  };

export const resetUserPassword =
  (
    email: string,
    token: string,
    body: {
      newPassword: string;
      passwordConfirmation: string;
    },
    setErrors: {
      (errors: string[]): void;
    }
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      setErrors([]);

      await API.post(`/api/user/reset-password/${email}/${token}`, body);

      alert("New password was successfully set.");
      dispatch(resetPasswordAction);
      location.href = LOGIN_ROUTE;
    } catch (err) {
      setErrors(processErrors(err as AxiosError));
    }
  };
