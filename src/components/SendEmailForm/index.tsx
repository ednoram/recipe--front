import { useState, FC, FormEvent } from "react";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";

import { sendRecoveryEmail, sendVerificationEmail } from "@/store/actions";

import styles from "./SendEmailForm.module.scss";

interface Props {
  recovery?: boolean;
}

const SendEmailForm: FC<Props> = ({ recovery }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string | null>(null);

  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (recovery) {
      dispatch(sendRecoveryEmail(email, setLoading, setErrors, setSuccess));
    } else {
      dispatch(sendVerificationEmail(email, setLoading, setErrors, setSuccess));
    }
  };

  const errorsList = (
    <ul className={styles.form__errors}>
      {errors.map((message) => (
        <li key={nanoid()}>
          <p>{message}</p>
        </li>
      ))}
    </ul>
  );

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="email"
        value={email}
        placeholder="Email Address"
        className={styles.form__input}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        name="Send Email"
        disabled={loading}
        className={styles.form__submit_button}
      >
        {recovery ? "Send Email" : "Send Again"}
      </button>
      {!loading && errorsList}
      {success && !loading && (
        <p className={styles.form__success_message}>{success}</p>
      )}
      {loading && (
        <div className="flex_center">
          <p className={styles.form__loading_p}>Loading...</p>
        </div>
      )}
    </form>
  );
};

export default SendEmailForm;
