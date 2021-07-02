import { useState, FC, FormEvent } from "react";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { registerUser } from "@/lib";
import { useIsLoggedIn } from "@/hooks";
import { loginUser } from "@/store/actions";
import { MY_ACCOUNT_ROUTE } from "@/constants";

import styles from "./AuthForm.module.scss";

interface Props {
  register?: boolean;
}

const AuthForm: FC<Props> = ({ register }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useIsLoggedIn();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (register) {
      registerUser(
        { name, email, password, passwordConfirmation },
        setLoading,
        setErrors
      );
    } else {
      dispatch(loginUser({ email, password }, setErrors));
    }

    setTimeout(() => {
      if (localStorage.getItem("token")) {
        router.push(MY_ACCOUNT_ROUTE);
      }
    }, 1000);
  };

  const errorsList = (
    <ul className={styles.form__errors_list}>
      {(errors[0] || errors.length > 1) &&
        errors.map((message) => (
          <li key={nanoid()}>
            <p>• {message}</p>
          </li>
        ))}
    </ul>
  );

  const loadingLi = loading && (
    <li>
      <p className="color-primary">Loading...</p>
    </li>
  );

  return isLoggedIn ? (
    <p className="auth_problem_p">You are logged in.</p>
  ) : (
    <form onSubmit={handleSubmit} className={styles.form}>
      <ul className={styles.form__inputs_list}>
        {register && (
          <li>
            <input
              value={name}
              placeholder="Name"
              className={styles.form__input}
              onChange={(e) => setName(e.target.value)}
            />
          </li>
        )}
        <li>
          <input
            type="email"
            value={email}
            placeholder="Email address"
            className={styles.form__input}
            onChange={(e) => setEmail(e.target.value)}
          />
        </li>
        <li>
          <input
            value={password}
            type="password"
            placeholder="Password"
            className={styles.form__input}
            onChange={(e) => setPassword(e.target.value)}
          />
        </li>
        {register && (
          <li>
            <input
              type="password"
              value={passwordConfirmation}
              placeholder="Confirm Password"
              className={styles.form__input}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </li>
        )}
        <li>
          <button disabled={loading} className={styles.form__submit_button}>
            Continue
          </button>
        </li>
        <li>{!loading && errorsList}</li>
        {loadingLi}
      </ul>
    </form>
  );
};

export default AuthForm;
