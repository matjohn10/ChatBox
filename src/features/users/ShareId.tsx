import { useAppSelector } from "../../app/hooks";
import { getUser } from "./userSlice";

const ShareId = () => {
  const user = useAppSelector(getUser);
  return <div className="shareIdDiv">My ID:&nbsp; {user?.userId}</div>;
};

export default ShareId;
