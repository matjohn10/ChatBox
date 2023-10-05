import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { fetchUser, getUserStatus } from "./userSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const status = useAppSelector(getUserStatus);

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.currentTarget.value);
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.currentTarget.value);

  const onSubmitLogin = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    await dispatch(fetchUser({ username, password }));
    if (status === "error") {
      alert("You entered the wrong credentials. Please try again.");
      setPassword("");
    } else {
      setUsername("");
      setPassword("");
      navigate("/user");
    }
  };

  return (
    <section className="loginSection">
      <h2>Login</h2>
      <article className="loginArticle">
        <form onSubmit={onSubmitLogin}>
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
          <button type="submit" onClick={onSubmitLogin} className="loginButton">
            Login
          </button>
        </form>
        <p></p>
      </article>

      <Link to="/login/signup" className="credentialLink">
        Signup
      </Link>
    </section>
  );
};

export default Login;
