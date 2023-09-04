import { Friend } from "../../app/userHook";
import * as Unicons from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";

interface Props {
  friend: Friend;
}

const FriendExcerpt = ({ friend }: Props) => {
  const navigate = useNavigate();
  const onMessageFriendClick = () => {
    navigate(`/messages/${friend.userId}`);
  };
  return (
    <div className="friendExcerptDiv">
      <div className="userNames">
        <p>
          {friend.firstname}&nbsp; {friend.lastname}
        </p>
        <p className="usernameText">#{friend.username}</p>
      </div>

      <Unicons.UilMessage
        color={friend.bgColor}
        className="addFriendBtn"
        onClick={onMessageFriendClick}
      />
    </div>
  );
};

export default FriendExcerpt;
