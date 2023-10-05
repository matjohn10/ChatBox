import { Socket } from "socket.io-client";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Conversation, Room } from "../../app/userHook";
import {
  getFriends,
  addNewFriend,
  getUser,
  getAllUsers,
} from "../users/userSlice";
import TimeAgo from "./TimeAgo";

interface Props {
  conversation: Conversation | undefined;
  room: Room | undefined;
  socket: Socket;
}

const MessagesArticle = ({ conversation, room, socket }: Props) => {
  const friends = useAppSelector(getFriends);
  const allUsers = useAppSelector(getAllUsers);
  const currUser = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const allmessagesSortedbyDate: {
    userId?: string;
    content: string;
    date: string;
  }[] = [...(conversation?.sent || []), ...(conversation?.received || [])].sort(
    (a, b) => b.date.localeCompare(a.date)
  );
  const handleAddFriend = (userId: string | undefined) => {
    const friend = allUsers?.find((friend) => friend.userId === userId);
    const newUserFriends = friend && [...friends, friend];
    friend &&
      dispatch(
        addNewFriend({
          user: currUser || {},
          friends: newUserFriends || [],
          friend,
        })
      );
    socket.emit("friend_added", { user: currUser, friend });
  };
  const renderedMessages = allmessagesSortedbyDate.map((message) => {
    return (
      <div
        className={message.userId ? "receivedMessage" : "sentMessage"}
        key={Math.random()}
      >
        <div className="textMessage">
          <p>{message.content}</p>
          <p>
            <span
              className={
                message.userId &&
                friends.find((friend) => friend.userId === message.userId)
                  ? ""
                  : "notFriendInChatSpan"
              }
              onClick={() => handleAddFriend(message.userId)}
            >
              <i>
                {room && message.userId
                  ? room.members.find(
                      (member) => member.userId === message.userId
                    )?.firstname + " -"
                  : ""}
              </i>
              <div className="notFriendPopup">
                You are not Friends. Click name to add!
              </div>
            </span>
            <TimeAgo timestamp={message.date} />
          </p>
        </div>
      </div>
    );
  });
  return <>{renderedMessages}</>;
};

export default MessagesArticle;
