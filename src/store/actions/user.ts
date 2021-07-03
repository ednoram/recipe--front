import { AxiosError } from "axios";

import {
  API,
  LOGIN_ROUTE,
  MY_ACCOUNT_ROUTE,
  VERIFY_ACCOUNT_ROUTE,
} from "@/constants";
import { processErrors } from "@/utils";
import { UserData, Dispatch } from "@/types";
import { SET_USER_DATA } from "@/store/reducers/user";

const setUserData = (data: UserData | null) => ({
  type: SET_USER_DATA,
  payload: { data },
});

export const logoutUser =
  () =>
  (dispatch: Dispatch): void => {
    dispatch(setUserData(null));
    localStorage.clear();
    location.href = "/";
  };

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

      localStorage.setItem("token", data.token);
      dispatch(setUserData(data.data));
    } catch (err) {
      setErrors(processErrors(err as AxiosError));
    }
  };

export const loginWithToken =
  (token: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const { data } = await API.post("/api/user/login-with-token", { token });
      localStorage.setItem("token", data.token);
      dispatch(setUserData(data.data));
    } catch {
      dispatch(logoutUser());
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

      const token = localStorage.getItem("token");
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

      const token = localStorage.getItem("token");
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
      const token = localStorage.getItem("token");

      await API.delete(`api/user/${id}`, { data: { ...body, token } });
      dispatch(logoutUser());
    } catch (err) {
      setErrors(processErrors(err as AxiosError));
    }
  };

export const addFavoriteRecipe =
  (recipeId: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.post("/api/user/favorite-recipes/add", {
        token,
        recipeId,
      });
      dispatch(setUserData(data));
    } catch {
      alert("Something went wrong");
    }
  };

export const removeFavoriteRecipe =
  (recipeId: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.post("/api/user/favorite-recipes/remove", {
        token,
        recipeId,
      });
      dispatch(setUserData(data));
    } catch {
      alert("Something went wrong");
    }
  };

export const registerUser = async (
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
): Promise<void> => {
  try {
    setErrors([]);
    setLoading(true);

    await API.post("/api/user/register", body);

    location.href = VERIFY_ACCOUNT_ROUTE;
    setLoading(false);
  } catch (err) {
    setErrors(processErrors(err as AxiosError));
    setLoading(false);
  }
};

export const sendVerificationEmail = async (
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
): Promise<void> => {
  try {
    setErrors([]);
    setLoading(true);

    await API.post("/api/user/send-verification", { email });

    setSuccess("Email was sent");
    setLoading(false);
  } catch (err) {
    setSuccess(null);
    setErrors(processErrors(err as AxiosError));
    setLoading(false);
  }
};

export const sendRecoveryEmail = async (
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
): Promise<void> => {
  try {
    setErrors([]);
    setLoading(true);

    await API.post("/api/user/send-recovery", { email });

    setSuccess("Email was sent");
    setLoading(false);
  } catch (err) {
    setSuccess(null);
    setErrors(processErrors(err as AxiosError));
    setLoading(false);
  }
};

export const recoverUserPassword = async (
  body: {
    token: string;
    newPassword: string;
    passwordConfirmation: string;
  },
  setErrors: {
    (errors: string[]): void;
  }
): Promise<void> => {
  try {
    setErrors([]);

    await API.post("/api/user/recover-password", body);

    alert("New password was successfully set.");
    location.href = LOGIN_ROUTE;
  } catch (err) {
    setErrors(processErrors(err as AxiosError));
  }
};
