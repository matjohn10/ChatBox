import type { User } from "../../app/userHook";
import * as Unicons from "@iconscout/react-unicons";
import { useAppSelector } from "../../app/hooks";
import { getFriends } from "./userSlice";
import { useState } from "react";

interface Props {
  user: User;
}

const SuggestedFriendExcerpt = ({ user }: Props) => {
  const currUserFriends = useAppSelector(getFriends);
  const [isFriend, setIsFriend] = useState(
    currUserFriends?.find((friend) => friend.userId === user.userId) && true
  );
  // let isFriend =
  //   currUserFriends?.find((friend) => friend.userId === user.userId) && true;
  const onAddFriendClick = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    setIsFriend(true);
  };
  return (
    <div className="suggestedFriendDiv">
      <div
        className="suggestedFriendBadge"
        style={{ color: user.bgColor }}
        onClick={() => {
          console.log(isFriend);
        }}
      >
        {user.firstname.slice(0, 1)}
      </div>
      <div className="suggestedFriendInfo">
        <p>
          {user.firstname}&nbsp; {user.lastname}
        </p>
        <p className="usernameText">{user.username}</p>
      </div>
      {isFriend ? (
        <Unicons.UilCheckCircle color={user.bgColor} />
      ) : (
        <Unicons.UilPlusCircle
          color={user.bgColor}
          className="addFriendBtn"
          onClick={onAddFriendClick}
        />
      )}
    </div>
  );
};

export default SuggestedFriendExcerpt;
