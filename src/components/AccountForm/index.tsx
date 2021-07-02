import { useState, useEffect, FC, FormEvent } from "react";
import Link from "next/link";
import { nanoid } from "nanoid";
import { useSelector, useDispatch } from "react-redux";

import { selectUserData } from "@/store/selectors";
import { CHANGE_PASSWORD_ROUTE, DELETE_ACCOUNT_ROUTE } from "@/constants";
import { patchUser, changeUserPassword, deleteUser } from "@/store/actions";

import styles from "./AccountForm.module.scss";

interface Props {
  deleteAccount?: boolean;
  changePassword?: boolean;
}

const AccountForm: FC<Props> = ({ changePassword, deleteAccount }) => {
  const [name, setName] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
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
    } else if (deleteAccount) {
      if (confirm("Are you sure you want to delete your account?")) {
        dispatch(
          deleteUser(userData._id, { password: currentPassword }, setErrors)
        );
      }
    } else {
      dispatch(patchUser(userData._id, { name }, setErrors));
    }
  };

  useEffect(() => {
    if (userData?.name && !name) {
      setName(userData.name);
    }
  }, [userData]);

  const changePasswordInputs = (
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
          className={styles.form__input}
          placeholder="Confirm New Password"
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </li>
    </ul>
  );

  const deleteAccountInputs = (
    <input
      type="password"
      placeholder="Password"
      value={currentPassword}
      className={styles.form__input}
      onChange={(e) => setCurrentPassword(e.target.value)}
    />
  );

  const inputs = changePassword ? (
    changePasswordInputs
  ) : deleteAccount ? (
    deleteAccountInputs
  ) : (
    <input
      value={name}
      placeholder="Name"
      className={styles.form__input}
      onChange={(e) => setName(e.target.value)}
    />
  );

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
      {inputs}
      <button
        className={
          deleteAccount
            ? styles.form__delete_submit_button
            : styles.form__submit_button
        }
      >
        {deleteAccount ? "Delete Account" : "Submit Changes"}
      </button>
      {!changePassword && !deleteAccount && (
        <div>
          <div>
            <Link href={CHANGE_PASSWORD_ROUTE}>
              <a className={styles.form__password_link}>Change Password</a>
            </Link>
          </div>
          <div>
            <Link href={DELETE_ACCOUNT_ROUTE}>
              <a className={styles.form__delete_link}>Delete Account</a>
            </Link>
          </div>
        </div>
      )}
      {errorsList}
    </form>
  );
};

export default AccountForm;
