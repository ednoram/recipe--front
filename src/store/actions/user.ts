import { AxiosError } from "axios";

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
  ADD_FAVORITE_RECIPE,
  REMOVE_FAVORITE_RECIPE,
} from "@/store/reducers/user";
import { UserData, Dispatch } from "@/types";
import { processErrors, createAction } from "@/utils";

const setUserData = (data: UserData | null) =>
  createAction(SET_USER_DATA, { data });

const addFavRecipe = (recipeId: string) =>
  createAction(ADD_FAVORITE_RECIPE, { recipeId });

const removeFavRecipe = (recipeId: string) =>
  createAction(REMOVE_FAVORITE_RECIPE, { recipeId });

const sendEmailAction = () => createAction(SEND_EMAIL, {});

const registerUserAction = () => createAction(REGISTER_USER, {});

export const loginUser =
  (
    body: { email: string; password: string },
    setErrors: {
      (errors: string[]): void;
    }
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      setErrors([]);

      const { data } = await API.post("/api/user/login", body);

      sessionStorage.setItem("isLoggedIn", "true");
      dispatch(setUserData(data));
      location.href = MY_ACCOUNT_ROUTE;
    } catch (err) {
      setErrors(processErrors(err as AxiosError));
    }
  };

export const loginWithToken =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const { data } = await API.post("/api/user/login-with-token");

      if (data) {
        dispatch(setUserData(data));
        sessionStorage.setItem("isLoggedIn", "true");
      }
    } catch {
      dispatch(logoutUser());
    }
  };

export const logoutUser =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      await API.post("/api/user/logout");
    } catch {
      alert("Something went wrong");
    }

    sessionStorage.removeItem("isLoggedIn");
    dispatch(setUserData(null));
    location.href = "/";
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

      const { data } = await API.patch(`api/user/${id}`, body);

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

      const { data } = await API.patch(`api/user/${id}/password`, body);

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

      await API.delete(`api/user/${id}`, { data: body });

      dispatch(logoutUser());
    } catch (err) {
      setErrors(processErrors(err as AxiosError));
    }
  };

export const addFavoriteRecipe =
  (recipeId: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      await API.post("/api/user/favorite-recipes/add", { recipeId });
      dispatch(addFavRecipe(recipeId));
    } catch {
      alert("Something went wrong");
    }
  };

export const removeFavoriteRecipe =
  (recipeId: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      await API.post("/api/user/favorite-recipes/remove", { recipeId });
      dispatch(removeFavRecipe(recipeId));
    } catch {
      alert("Something went wrong");
    }
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

      dispatch(registerUserAction());
      setLoading(false);
      location.href = VERIFY_ACCOUNT_ROUTE;
    } catch (err) {
      setErrors(processErrors(err as AxiosError));
      setLoading(false);
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

export const resetUserPassword = async (
  email: string,
  token: string,
  body: {
    newPassword: string;
    passwordConfirmation: string;
  },
  setErrors: {
    (errors: string[]): void;
  }
): Promise<void> => {
  try {
    setErrors([]);

    await API.post(`/api/user/reset-password/${email}/${token}`, body);

    alert("New password was successfully set.");
    location.href = LOGIN_ROUTE;
  } catch (err) {
    setErrors(processErrors(err as AxiosError));
  }
};
