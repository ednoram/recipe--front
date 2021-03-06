import { useState, FC, FormEvent } from "react";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";

import { useIsLoggedIn } from "@/hooks";
import { loginUser, registerUser } from "@/store/actions";

import styles from "./AuthForm.module.scss";

interface Props {
  register?: boolean;
}

const AuthForm: FC<Props> = ({ register }) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const dispatch = useDispatch();
  const isLoggedIn = useIsLoggedIn();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (register) {
      dispatch(
        registerUser(
          { name, email, password, passwordConfirmation },
          setLoading,
          setErrors
        )
      );
    } else {
      dispatch(loginUser({ email, password }, setLoading, setErrors));
    }
  };

  const inputLis = (
    <>
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
    </>
  );

  const errorsList = (
    <ul className={styles.form__errors_list}>
      {(errors[0] || errors.length > 1) &&
        errors.map((message) => (
          <li key={nanoid()}>
            <p>??? {message}</p>
          </li>
        ))}
    </ul>
  );

  const loadingLi = loading && (
    <li>
      <div className="flex_center">
        <p className="color-primary">Loading...</p>
      </div>
    </li>
  );

  return isLoggedIn ? (
    <p className="auth_problem_p">You are logged in.</p>
  ) : (
    <form onSubmit={handleSubmit} className={styles.form}>
      <ul className={styles.form__inputs_list}>
        {inputLis}
        <li>
          <button
            name="Continue"
            disabled={loading}
            className={styles.form__submit_button}
          >
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
