import { useState, useEffect, FC, FormEvent } from "react";
import Link from "next/link";
import { nanoid } from "nanoid";
import { useSelector, useDispatch } from "react-redux";

import { selectUserData } from "@/store/selectors";
import { CHANGE_PASSWORD_ROUTE } from "@/constants";
import { patchUser, changeUserPassword } from "@/store/actions";

import styles from "./AccountForm.module.scss";

interface Props {
  changePassword?: boolean;
}

const AccountForm: FC<Props> = ({ changePassword }) => {
  const [name, setName] = useState<string>("");
  const [errors, setErrors] = useState<Array<string>>([""]);
  const [newPassword, setNewPassword] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  const userData = useSelector(selectUserData);

  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (changePassword) {
      dispatch(
        changeUserPassword(
          userData._id,
          { currentPassword, newPassword, passwordConfirmation },
          setErrors
        )
      );
    } else {
      dispatch(patchUser(userData._id, { name }, setErrors));
    }
  };

  useEffect(() => {
    if (userData?.name && !name) {
      setName(userData.name);
    }
  }, [userData]);

  const passwordInputs = (
    <ul className={styles.form__inputs_list}>
      <li>
        <input
          type="password"
          value={currentPassword}
          placeholder="Current Password"
          className={styles.form__input}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </li>
      <li>
        <input
          type="password"
          value={newPassword}
          placeholder="New Password"
          className={styles.form__input}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </li>
      <li>
        <input
          type="password"
          value={passwordConfirmation}
          placeholder="Confirm New Password"
          className={styles.form__input}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </li>
    </ul>
  );

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {changePassword ? (
        passwordInputs
      ) : (
        <label>
          <span className="color-primary">Name:</span>
          <input
            value={name}
            placeholder="Name"
            className={styles.form__input}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      )}
      <button className={styles.form__submit_button}>Submit Changes</button>
      {!changePassword && (
        <Link href={CHANGE_PASSWORD_ROUTE}>
          <a className={styles.form__password_link}>Change Password</a>
        </Link>
      )}
      <div className={styles.form__errors}>
        {errors.map((message) => (
          <p key={nanoid()}>{message}</p>
        ))}
      </div>
    </form>
  );
};

export default AccountForm;
