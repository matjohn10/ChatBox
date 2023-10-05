import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { getUser, getUserStatus } from "../features/users/userSlice";

const PrivateRoutes = () => {
  const user = useAppSelector(getUser);
  const storedUser = localStorage.getItem("user");
  const status = useAppSelector(getUserStatus);
  if (status === "loading") return <div>Loading....</div>;
  return user && storedUser ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
