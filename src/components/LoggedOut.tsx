import { useAppDispatch, useAppSelector } from "../app/hooks";
import { removeUser, getUser } from "../features/users/userSlice";
import { Link } from "react-router-dom";

const LoggedOut = () => {
  const dispatch = useAppDispatch();

  dispatch(removeUser);
  const user = useAppSelector(getUser);
  return (
    <section className="indexSection">
      <div className="loggedoutDiv">
        {!user ? (
          <p>Successfully Logged Out!</p>
        ) : (
          <p>Error occured during logout.</p>
        )}
        <br />
        <div className="loggedOutLinksDiv">
          <p>
            Back to&nbsp;{" "}
            <Link className="loggedOutLink" to="/login">
              Login
            </Link>{" "}
            &nbsp;
          </p>
          <p>
            or&nbsp;{" "}
            <Link className="loggedOutLink" to="/">
              Home
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoggedOut;
