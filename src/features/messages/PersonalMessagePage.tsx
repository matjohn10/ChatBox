import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  getConvoFromRoomOrFriendId,
  getFriendById,
  getUser,
  saveNewMessage,
  fetchUser,
  getUserStatus,
  getRoomById,
} from "../users/userSlice";
import { Socket } from "socket.io-client";
import ConversationExcerpts from "../users/ConversationExcerpts";
import { useState, useEffect } from "react";
import MessagesArticle from "./MessagesArticle";

interface Props {
  socket: Socket;
}

const PersonalMessagePage = ({ socket }: Props) => {
  const [message, setMessage] = useState("");
  const [nothing, setNothing] = useState(false);
  const dispatch = useAppDispatch();
  const onChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMessage(e.currentTarget.value);
  const { friendId } = useParams();
  const friend = useAppSelector((state) =>
    getFriendById(state, friendId || "")
  );
  const room = useAppSelector((state) => getRoomById(state, friendId || ""));
  const conversation = useAppSelector((state) =>
    getConvoFromRoomOrFriendId(state, friendId || "")
  );
  const user = useAppSelector(getUser);
  const status = useAppSelector(getUserStatus);

  const sendMessageToAllGroup = (id: string) => {
    const memberInfo = useAppSelector((state) => getFriendById(state, id));
    const data = {
      content: message,
      to: memberInfo?.userId || "",
      from: user?.userId || "",
      date: new Date().toISOString(),
    };
    dispatch(saveNewMessage(data));
  };

  const onSendMessage = (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (friend) {
      const data = {
        content: message,
        to: friendId || "",
        from: user?.userId || "",
        date: new Date().toISOString(),
      };
      dispatch(saveNewMessage(data));
      if (status === "succeeded") socket.emit("message_to_friend", data);
    } else {
      room?.members.map((memberId) => sendMessageToAllGroup(memberId.userId));
      const data = {
        content: message,
        group: room,
        from: user?.userId || "",
        date: new Date().toISOString(),
      };
      if (status === "succeeded") socket.emit("message_to_group", data);
    }

    setMessage("");
  };

  useEffect(() => {
    socket.on("message_from_friend", () => {
      dispatch(
        fetchUser({ username: user?.username || "", userId: user?.userId })
      );
    });
  }, [socket]);

  return (
    <section className="messagePageSection">
      <article className="messagesExcerptsArticle">
        <ConversationExcerpts setIsCreateChat={setNothing} plusChatOn={false} />
      </article>
      <article className="messageArticle">
        <h2>{friend ? friend?.firstname : room?.name}</h2>
        <div className="messagingDiv">
          <MessagesArticle conversation={conversation} />
        </div>
        <div className="sendMessageForm">
          <form onSubmit={onSendMessage}>
            <input
              type="text"
              multiple
              name="message"
              id="message"
              value={message}
              onChange={onChangeMessage}
            />
          </form>
          <button
            className="messageButton"
            onClick={onSendMessage}
            disabled={!message}
          >
            Send
          </button>
        </div>
      </article>
    </section>
  );
};

export default PersonalMessagePage;
