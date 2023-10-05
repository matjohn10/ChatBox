import { Link } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { removeUser } from "../features/users/userSlice";
import * as Unicons from "@iconscout/react-unicons";
import { useState } from "react";
import { Socket } from "socket.io-client";

interface Props {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  socket: Socket;
}

const Header = ({ setIsMenuOpen, socket }: Props) => {
  const user = localStorage.getItem("user"); //useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(removeUser(null));
    socket.disconnect();
  };

  // user nav bar clicked check
  const [userNavClicked, setUserNavClicked] = useState(false);
  return (
    <header className="Header">
      <div className="titleDiv">
        <div className="sideMenuSelectorDiv addFriendBtn">
          <Unicons.UilBars
            color="var(--text-light)"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          />
        </div>
        <h1>ChatBox</h1>
      </div>
      <nav>
        <ul className="navBarUl">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>{user ? <Link to="/user">Profile</Link> : <></>}</li>
          <li>
            {!user ? (
              <Link to="/login">SignIn/SignUp</Link>
            ) : (
              <Link to="/logout" onClick={handleLogout}>
                Logout
              </Link>
            )}
          </li>
        </ul>
        <ul className="smallScreenNavBarUl">
          <li>
            <div className="dropDownDiv">
              <button
                className="dropDownBtn"
                onClick={() => setUserNavClicked((prev) => !prev)}
              >
                <Unicons.UilUserCircle
                  color="var(--text-light)"
                  className="addFriendBtn profileInfoNavBar"
                />
              </button>
              <div
                className={
                  userNavClicked
                    ? "dropDownContent navUserOpen"
                    : "dropDownContent"
                }
              >
                <Link to="/">Home</Link>
                {user ? <Link to="/user">Profile</Link> : <></>}
                {!user ? (
                  <Link to="/login">SignIn/SignUp</Link>
                ) : (
                  <Link to="/logout" onClick={handleLogout}>
                    Logout
                  </Link>
                )}
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
