import { Conversation, Friend, Room } from "../../app/userHook";
import { useAppSelector } from "../../app/hooks";
import { getFriends, getRooms } from "../users/userSlice";
import { Link } from "react-router-dom";

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
    <>
      {convoFriend ? (
        <p>{convoFriend.firstname}</p>
      ) : (
        <p>
          {convoRoom?.members.map((member) => (
            <span>
              {friends.find((friend) => friend.userId === member)?.firstname}
              &nbsp;{" "}
            </span>
          ))}
        </p>
      )}{" "}
      <Link to={`/messages/${conversation.convoId}`}>Go to messages</Link>
    </>
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
