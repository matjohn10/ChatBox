import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getUser,
  updateUserInfo,
  updateUserSettings,
  getUserStatus,
  getuserSettings,
} from "./userSlice";

const ProfileSettings = () => {
  const [isDark, setIsDark] = useState(
    useAppSelector(getuserSettings)?.isDarkMode
  );
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const user = useAppSelector(getUser);
  const status = useAppSelector(getUserStatus);
  const [bgColor, setBgColor] = useState(user?.bgColor);
  const dispatch = useAppDispatch();

  const onRevertClick = () => {
    setBgColor(user?.bgColor);
  };

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewUsername(e.currentTarget.value);
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewPassword(e.currentTarget.value);
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewEmail(e.currentTarget.value);
  const onChangeColor = (e: React.ChangeEvent<HTMLInputElement>) =>
    setBgColor(e.currentTarget.value);
  const onChangeClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDark(e.currentTarget.checked);
  };

  const onModeChange = () => {
    dispatch(
      updateUserSettings({
        userId: user?.userId,
        isDarkMode: !isDark,
        bgColor: user?.bgColor,
      })
    );
    setIsDark((prev) => !prev);
  };

  const onSaveChangesClick = (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    dispatch(updateUserInfo({ newUsername, newPassword, newEmail, bgColor }));
  };

  return (
    <article className="profileSettingArticle">
      <div className="toggleDarkDiv">
        <label htmlFor="lightDark" className="switch" onClick={onModeChange}>
          <input
            type="checkbox"
            checked={isDark}
            onChange={(e) => onChangeClick}
            disabled={status === "loading"}
          />
        </label>
        <span>{`${isDark ? "Dark" : "Light"} Mode`}</span>
      </div>
      <form onSubmit={onSaveChangesClick}>
        <div className="formInputDiv">
          <label htmlFor="changeEmail">Update Email: </label>
          <input
            type="text"
            id="changeEmail"
            name="changeEmail"
            placeholder={user?.email}
            onChange={onChangeEmail}
          />
        </div>
        <div className="formInputDiv">
          <label htmlFor="changeUsername">Change Username: </label>
          <input
            type="text"
            id="changeUsername"
            name="changeUsername"
            placeholder={user?.username}
            onChange={onChangeUsername}
          />
        </div>
        <div className="formInputDiv">
          <label htmlFor="changePassword">Change Password: </label>
          <input
            type="password"
            id="changePassword"
            name="changePassword"
            onChange={onChangePassword}
          />
        </div>
        <div className="inputColor">
          <label htmlFor="bgColor">Profile Color</label>
          <input
            type="color"
            id="bgColor"
            name="bgColor"
            value={bgColor}
            onChange={onChangeColor}
            style={{
              backgroundColor: `${bgColor}`,
              boxShadow: `0px 0px 5px 2px ${bgColor}`,
              border: "none",
            }}
          />
          <div className="revertColor" onClick={onRevertClick}>
            Revert
          </div>
        </div>
        <button
          onClick={onSaveChangesClick}
          disabled={
            !(
              newUsername ||
              newEmail ||
              newPassword ||
              user?.bgColor !== bgColor
            )
          }
        >
          Save Changes
        </button>
      </form>
    </article>
  );
};

export default ProfileSettings;
