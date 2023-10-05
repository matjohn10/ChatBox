import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addUser, getUserStatus } from "./userSlice";

const MoreInfo = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bgColor, setBgColor] = useState("#042d64");

  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const status = useAppSelector(getUserStatus);

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.currentTarget.value);
  const onChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLastName(e.currentTarget.value);
  const onChangeColor = (e: React.ChangeEvent<HTMLInputElement>) =>
    setBgColor(e.currentTarget.value);

  const onSubmitSignup = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log(location.state);
    dispatch(
      addUser({
        firstname: name,
        lastname: lastName,
        bgColor,
        ...location.state,
      })
    );
    //Reset inputs
    setName("");
    setLastName("");
    setBgColor("");
    if (status === "loading") return <div>Loading....</div>;
    if (status === "succeeded") navigate("/login");
  };

  return (
    <section className="signupSection">
      <h2>SignUp</h2>
      <article className="signupArticle">
        <form onSubmit={onSubmitSignup}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={onChangeName}
          />
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={lastName}
            onChange={onChangeLastName}
          />
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
              }}
            />
          </div>
          <button
            id="moreBtn"
            type="submit"
            onClick={onSubmitSignup}
            className="signupButton"
          >
            Save
          </button>
        </form>
      </article>
    </section>
  );
};

export default MoreInfo;
