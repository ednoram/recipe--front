import { FC, Dispatch, SetStateAction } from "react";

import styles from "./AccountForm.module.scss";

interface Props {
  resetPassword?: boolean;
  newPasswordState: [string, Dispatch<SetStateAction<string>>];
  currentPasswordState: [string, Dispatch<SetStateAction<string>>];
  passwordConfirmationState: [string, Dispatch<SetStateAction<string>>];
}

const ChangePasswordInputs: FC<Props> = ({
  resetPassword,
  newPasswordState,
  currentPasswordState,
  passwordConfirmationState,
}) => {
  const [passwordConfirmation, setPasswordConfirmation] =
    passwordConfirmationState;
  const [newPassword, setNewPassword] = newPasswordState;
  const [currentPassword, setCurrentPassword] = currentPasswordState;

  return (
    <ul className={styles.form__inputs_list}>
      {!resetPassword && (
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
