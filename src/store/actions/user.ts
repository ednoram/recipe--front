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
    setErrors: {
      (errors: string[]): void;
    }
  ) =>
  (dispatch: Dispatch): void => {
    API.post("/api/user/login", body)
      .then((res) => {
        setErrors([]);
        localStorage.setItem("token", res.data.token);
        dispatch(setUserData(res.data.data));
      })
      .catch((err) => setErrors(processErrors(err)));
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
    setErrors: {
      (errors: string[]): void;
    }
  ) =>
  (dispatch: Dispatch): void => {
    const token = localStorage.getItem("token");

    API.patch(`api/user/${id}`, { ...body, token })
      .then((res) => {
        dispatch(setUserData(res.data));
        location.href = MY_ACCOUNT_ROUTE;
      })
      .catch((err) => setErrors(processErrors(err)));
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
  (dispatch: Dispatch): void => {
    const token = localStorage.getItem("token");

    API.patch(`api/user/${id}/password`, { ...body, token })
      .then((res) => {
        dispatch(setUserData(res.data));
        location.href = MY_ACCOUNT_ROUTE;
      })
      .catch((err) => setErrors(processErrors(err)));
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
  (dispatch: Dispatch): void => {
    const token = localStorage.getItem("token");

    API.delete(`api/user/${id}`, { data: { ...body, token } })
      .then(() => {
        dispatch(logoutUser());
      })
      .catch((err) => setErrors(processErrors(err)));
  };

export const addFavoriteRecipe =
  (recipeId: string) =>
  (dispatch: Dispatch): void => {
    const token = localStorage.getItem("token");

    API.post("/api/user/favorite-recipes/add", { token, recipeId })
      .then((res) => {
        dispatch(setUserData(res.data));
      })
      .catch((err) => {
        throw err;
      });
  };

export const removeFavoriteRecipe =
  (recipeId: string) =>
  (dispatch: Dispatch): void => {
    const token = localStorage.getItem("token");

    API.post("/api/user/favorite-recipes/remove", { token, recipeId }).then(
      (res) => {
        dispatch(setUserData(res.data));
      }
    );
  };
