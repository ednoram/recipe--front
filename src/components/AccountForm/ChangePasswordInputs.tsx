import { FC, Dispatch, SetStateAction } from "react";

import styles from "./AccountForm.module.scss";

interface Props {
  recoverPassword?: boolean;
  accessTokenState: [string, Dispatch<SetStateAction<string>>];
  newPasswordState: [string, Dispatch<SetStateAction<string>>];
  currentPasswordState: [string, Dispatch<SetStateAction<string>>];
  passwordConfirmationState: [string, Dispatch<SetStateAction<string>>];
}

const ChangePasswordInputs: FC<Props> = ({
  accessTokenState,
  recoverPassword,
  newPasswordState,
  currentPasswordState,
  passwordConfirmationState,
}) => {
  const [accessToken, setAccessToken] = accessTokenState;
  const [passwordConfirmation, setPasswordConfirmation] =
    passwordConfirmationState;
  const [newPassword, setNewPassword] = newPasswordState;
  const [currentPassword, setCurrentPassword] = currentPasswordState;

  return (
    <ul className={styles.form__inputs_list}>
      {recoverPassword && "Copy and paste access access token from your inbox."}
      {recoverPassword ? (
        <li>
          <input
            value={accessToken}
            placeholder="Access Token"
            className={styles.form__input}
            onChange={(e) => setAccessToken(e.target.value)}
          />
        </li>
      ) : (
        <li>
          <input
            type="password"
            value={currentPassword}
            placeholder="Current Password"
            className={styles.form__input}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </li>
      )}
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
};

export default ChangePasswordInputs;
