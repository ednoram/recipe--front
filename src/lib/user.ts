import { User } from "@/types";
import { processErrors } from "@/utils";
import { API, VERIFY_ACCOUNT_ROUTE } from "@/constants";

export const getUsers = async (): Promise<User[]> =>
  await API.get("/api/user").then((res) => res.data);

export const registerUser = (
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
): void => {
  setLoading(true);
  API.post("/api/user/register", body)
    .then(() => {
      location.href = VERIFY_ACCOUNT_ROUTE;
      setLoading(false);
    })
    .catch((err) => {
      setErrors(processErrors(err));
      setLoading(false);
    });
};

export const sendVerificationEmail = (
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
): void => {
  setLoading(true);

  API.post("/api/user/send-verification", { email })
    .then(() => {
      setSuccess("Email was sent");
      setErrors([]);
      setLoading(false);
    })
    .catch((err) => {
      setSuccess(null);
      setErrors(processErrors(err));
      setLoading(false);
    });
};
