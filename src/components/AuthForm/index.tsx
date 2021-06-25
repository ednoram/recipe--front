import { useState, FC, FormEvent } from "react";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { useIsLoggedIn } from "@/hooks";
import { MY_ACCOUNT_ROUTE } from "@/constants";
import { loginUser, registerUser } from "@/store/actions";

import styles from "./AuthForm.module.scss";

interface Props {
  register?: boolean;
}

const AuthForm: FC<Props> = ({ register }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [errors, setErrors] = useState<Array<string>>([""]);

  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useIsLoggedIn();

  const updateErrors = (errors: Array<string>) => setErrors(errors);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (register) {
      dispatch(
        registerUser(
          { name, email, password, passwordConfirmation },
          updateErrors
        )
      );
    } else {
      dispatch(loginUser({ email, password }, updateErrors));
    }

    setTimeout(() => {
      if (localStorage.getItem("token")) {
        router.push(MY_ACCOUNT_ROUTE);
      }
    }, 1000);
  };

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
          <button className={styles.form__submit_button}>Continue</button>
        </li>
        <li>
          <ul className={styles.form__errors_list}>
            {(errors[0] || errors.length > 1) &&
              errors.map((message) => (
                <li key={nanoid()}>
                  <p>• {message}</p>
                </li>
              ))}
          </ul>
        </li>
      </ul>
    </form>
  );
};

export default AuthForm;
