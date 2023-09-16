import type { User } from "../../app/userHook";
import { getFriends } from "./userSlice";
import { useAppSelector } from "../../app/hooks";
import * as Unicons from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";

interface Props {
  user: User | null | undefined;
}

const FriendList = () => {
  const friends = useAppSelector(getFriends) || [];
  const navigate = useNavigate();
  const renderedFriends = friends.map((friend) => (
    <div className="friendListForGroup">
      <p>
        {friend.firstname}&nbsp; {friend.lastname}
      </p>
      <Unicons.UilPlusCircle
        color="var(--accent)"
        size="20"
        className="addFriendBtn"
        onClick={() => navigate("/messages/" + friend.userId)}
      />
    </div>
  ));
  return <div className="addFriendChatDiv">{renderedFriends}</div>;
};

export default FriendList;
