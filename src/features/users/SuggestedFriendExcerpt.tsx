import type { Friend } from "../../app/userHook";
import * as Unicons from "@iconscout/react-unicons";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getFriends, addNewFriend, getUser } from "./userSlice";
import { useState } from "react";
import { Socket } from "socket.io-client";

interface Props {
  friend: Friend;
  socket: Socket;
}

const SuggestedFriendExcerpt = ({ friend, socket }: Props) => {
  const currUserFriends = useAppSelector(getFriends);
  const currUser = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const [isFriend, setIsFriend] = useState(
    currUserFriends?.find((otherUser) => otherUser.userId === friend.userId) &&
      true
  );
  const onAddFriendClick = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    const newUserFriends = currUserFriends?.includes(friend)
      ? [...currUserFriends]
      : [...(currUserFriends || []), friend];
    dispatch(
      addNewFriend({
        user: currUser || {},
        friends: newUserFriends || [],
        friend,
      })
    );
    socket.emit("friend_added", { user: currUser, friend });
    setIsFriend(true);
  };
  return (
    <div className="suggestedFriendDiv" key={Math.random()}>
      <div
        className="suggestedFriendBadge"
        style={{ color: friend.bgColor }}
        onClick={() => {
          console.log(isFriend);
        }}
      >
        {friend.firstname.slice(0, 1)}
      </div>
      <div className="suggestedFriendInfo">
        <p>
          {friend.firstname}&nbsp; {friend.lastname}
        </p>
        <p className="usernameText">{friend.username}</p>
      </div>
      {isFriend ? (
        <Unicons.UilCheckCircle color={friend.bgColor} />
      ) : (
        <Unicons.UilPlusCircle
          color={friend.bgColor}
          className="addFriendBtn"
          onClick={onAddFriendClick}
        />
      )}
    </div>
  );
};

export default SuggestedFriendExcerpt;
