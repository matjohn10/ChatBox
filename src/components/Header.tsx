import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { getUser, removeUser } from "../features/users/userSlice";

const Header = () => {
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(removeUser(null));
  };
  return (
    <header className="Header">
      <h1>Chat App</h1>
      <nav>
        <ul>
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
          {/* TESTING MENU */}
          <li>
            <div className="dropDownDiv">
              <button className="dropDownBtn">
                Testing
                <i className="fa fa-caret-down"></i>
              </button>
              <div className="dropDownContent">
                <Link to="/test">Socket</Link>
                <Link to="/message-test">Message Test</Link>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
