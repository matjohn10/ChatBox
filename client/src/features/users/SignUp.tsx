import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { BaseSignUp } from "../../app/userHook";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.currentTarget.value);
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.currentTarget.value);
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.currentTarget.value);
  const onChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setConfirmPassword(e.currentTarget.value);

  const onSubmitSignup = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const signUpInfo = {
      userId: nanoid(),
      username,
      password,
      email: email,
    };
    navigate("/login/signup+", { state: { ...signUpInfo, ...BaseSignUp } });
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  return (
    <section className="signupSection">
      <h2>SignUp</h2>
      <article className="signupArticle">
        <form onSubmit={onSubmitSignup}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={onChangeEmail}
          />
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={onChangeUsername}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChangePassword}
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
          />
          <button
            type="submit"
            onClick={onSubmitSignup}
            className="signupButton"
            disabled={password !== confirmPassword}
          >
            SignUp
          </button>
        </form>
        {password !== confirmPassword ? (
          <p>Please enter same password.</p>
        ) : (
          <></>
        )}
      </article>

      <Link to="/login" className="credentialLink">
        Login
      </Link>
    </section>
  );
};

export default SignUp;
