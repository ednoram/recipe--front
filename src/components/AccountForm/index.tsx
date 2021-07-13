import { useState, useEffect, FC, FormEvent } from "react";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import {
  patchUser,
  deleteUser,
  resetUserPassword,
  changeUserPassword,
} from "@/store/actions";
import { selectUserData } from "@/store/selectors";

import styles from "./AccountForm.module.scss";
import ChangePasswordInputs from "./ChangePasswordInputs";

interface Props {
  deleteAccount?: boolean;
  resetPassword?: boolean;
  changePassword?: boolean;
}

const AccountForm: FC<Props> = ({
  deleteAccount,
  resetPassword,
  changePassword,
}) => {
  const [name, setName] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [newPassword, setNewPassword] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  const user = useSelector(selectUserData);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.name && !name) {
      setName(user.name);
    }
  }, [user]);

  const queryEmail = String(router.query.email);
  const queryToken = String(router.query.token);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (changePassword) {
      const body = { currentPassword, newPassword, passwordConfirmation };
      dispatch(changeUserPassword(user._id, body, setErrors));
      return;
    }

    if (deleteAccount) {
      if (
        confirm(
          "Are you sure you want to delete your account? Your data will be lost."
        )
      ) {
        dispatch(
          deleteUser(user._id, { password: currentPassword }, setErrors)
        );
      }
      return;
    }

    if (resetPassword) {
      const body = { newPassword, passwordConfirmation };
      resetUserPassword(queryEmail, queryToken, body, setErrors);
      return;
    }

    dispatch(patchUser(user._id, { name }, setErrors));
  };

  const deleteAccountInputs = (
    <input
      type="password"
      placeholder="Password"
      value={currentPassword}
      className={styles.form__input}
      onChange={(e) => setCurrentPassword(e.target.value)}
    />
  );

  const inputs =
    changePassword || resetPassword ? (
      <ChangePasswordInputs
        resetPassword={resetPassword}
        passwordConfirmationState={[
          passwordConfirmation,
          setPasswordConfirmation,
        ]}
        newPasswordState={[newPassword, setNewPassword]}
        currentPasswordState={[currentPassword, setCurrentPassword]}
      />
    ) : deleteAccount ? (
      deleteAccountInputs
    ) : (
      <input
        value={name}
        maxLength={25}
        placeholder="Name"
        className={styles.form__input}
        onChange={(e) => setName(e.target.value)}
      />
    );

  const errorsList = (
    <ul className={styles.form__errors}>
      {errors.map((message) => (
        <li key={nanoid()}>
          <p>• {message.toString().replace("jwt", "Access token")}</p>
        </li>
      ))}
    </ul>
  );

  const submitButtonClassName = deleteAccount
    ? styles.form__delete_submit_button
    : styles.form__submit_button;
  const defaultSubmitText = "Submit";
  const deleteSubmitText = deleteAccount && "Delete Account";
  const changeSubmitText = changePassword && "Change Password";

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {inputs}
      <button name="submit" className={submitButtonClassName}>
        {deleteSubmitText || changeSubmitText || defaultSubmitText}
      </button>
      {errorsList}
    </form>
  );
};

export default AccountForm;
