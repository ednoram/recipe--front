import { useState, useEffect, FC, FormEvent } from "react";
import Link from "next/link";
import { nanoid } from "nanoid";
import { useSelector, useDispatch } from "react-redux";

import { recoverUserPassword } from "@/lib";
import { selectUserData } from "@/store/selectors";
import { CHANGE_PASSWORD_ROUTE, DELETE_ACCOUNT_ROUTE } from "@/constants";
import { patchUser, deleteUser, changeUserPassword } from "@/store/actions";

import styles from "./AccountForm.module.scss";
import ChangePasswordInputs from "./ChangePasswordInputs";

interface Props {
  deleteAccount?: boolean;
  changePassword?: boolean;
  recoverPassword?: boolean;
}

const AccountForm: FC<Props> = ({
  deleteAccount,
  changePassword,
  recoverPassword,
}) => {
  const [name, setName] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [accessToken, setAccessToken] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  const userData = useSelector(selectUserData);

  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (changePassword) {
      const body = { currentPassword, newPassword, passwordConfirmation };
      dispatch(changeUserPassword(userData._id, body, setErrors));
      return;
    }

    if (deleteAccount) {
      if (
        confirm(
          "Are you sure you want to delete your account? Your data will be lost."
        )
      ) {
        dispatch(
          deleteUser(userData._id, { password: currentPassword }, setErrors)
        );
      }
      return;
    }

    if (recoverPassword) {
      const body = { token: accessToken, newPassword, passwordConfirmation };
      recoverUserPassword(body, setErrors);
      return;
    }

    dispatch(patchUser(userData._id, { name }, setErrors));
  };

  useEffect(() => {
    if (userData?.name && !name) {
      setName(userData.name);
    }
  }, [userData]);

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
    changePassword || recoverPassword ? (
      <ChangePasswordInputs
        recoverPassword={recoverPassword}
        passwordConfirmationState={[
          passwordConfirmation,
          setPasswordConfirmation,
        ]}
        accessTokenState={[accessToken, setAccessToken]}
        newPasswordState={[newPassword, setNewPassword]}
        currentPasswordState={[currentPassword, setCurrentPassword]}
      />
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
          <p>{message.toString().replace("jwt", "Access token")}</p>
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
      <button className={submitButtonClassName}>
        {deleteSubmitText || changeSubmitText || defaultSubmitText}
      </button>
      {!changePassword && !deleteAccount && !recoverPassword && (
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
