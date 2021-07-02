import { useState, FC, FormEvent } from "react";
import { nanoid } from "nanoid";

import { sendVerificationEmail } from "@/lib";

import styles from "./VerificationForm.module.scss";

const VerificationForm: FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendVerificationEmail(email, setLoading, setErrors, setSuccess);
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
      <button disabled={loading} className={styles.form__send_again_button}>
        Send Again
      </button>
      {!loading && errorsList}
      {success && !loading && (
        <p className={styles.form__success_message}>{success}</p>
      )}
      {loading && <p className={styles.form__loading_p}>Loading...</p>}
    </form>
  );
};

export default VerificationForm;
