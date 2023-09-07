import { Conversation } from "../../app/userHook";
import { useAppSelector } from "../../app/hooks";
import { getFriends, getRooms } from "../users/userSlice";
import { Link } from "react-router-dom";
import * as Unicons from "@iconscout/react-unicons";

interface Props {
  conversation: Conversation;
}

const MessageExcerpt = ({ conversation }: Props) => {
  const rooms = useAppSelector(getRooms) || [];
  const friends = useAppSelector(getFriends) || [];
  const convoRoom = rooms.find((room) => room.roomId === conversation.convoId);
  const convoFriend = friends.find(
    (friend) => friend.userId === conversation.convoId
  );
  const messageExcerpt = (
    <div className="messageExcerptDiv" key={Math.random()}>
      {convoFriend ? (
        <p>{convoFriend.firstname}</p>
      ) : (
        <p>
          {convoRoom?.members.map((member) => (
            <span key={Math.random()}>
              {friends.find((friend) => friend.userId === member)?.firstname}
              &nbsp;{" "}
            </span>
          ))}
        </p>
      )}{" "}
      <Link to={`/messages/${conversation.convoId}`}>
        <Unicons.UilMessage
          color={convoFriend ? convoFriend.bgColor : "black"}
          className="addFriendBtn"
        />
      </Link>
    </div>
  );
  //   [...rooms, ...friends].find(
  //     (convoType) =>
  //       (convoType as Friend).userId === conversation.convoId ||
  //       (convoType as Room).roomId === conversation.convoId
  //   );

  return (
    <div className="messageExcerpt" key={Math.random()}>
      {messageExcerpt}
    </div>
  );
};

export default MessageExcerpt;
