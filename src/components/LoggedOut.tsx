import { useAppDispatch, useAppSelector } from "../app/hooks";
import { removeUser, getUser } from "../features/users/userSlice";

const LoggedOut = () => {
  const dispatch = useAppDispatch();

  dispatch(removeUser);
  const user = useAppSelector(getUser);
  return (
    <div>
      {!user ? (
        <p>Successfully Logged Out!</p>
      ) : (
        <p>Error Occured during logout.</p>
      )}
    </div>
  );
};

export default LoggedOut;
