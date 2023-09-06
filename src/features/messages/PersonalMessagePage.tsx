import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  getConvoFromRoomOrFriendId,
  getFriendById,
  getUser,
  saveNewMessage,
  fetchUser,
  getUserStatus,
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
  const dispatch = useAppDispatch();
  const onChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMessage(e.currentTarget.value);
  const { friendId } = useParams();
  console.log(friendId);
  const friend = useAppSelector((state) =>
    getFriendById(state, friendId || "")
  );
  const conversation = useAppSelector((state) =>
    getConvoFromRoomOrFriendId(state, friendId || "")
  );
  const user = useAppSelector(getUser);
  const status = useAppSelector(getUserStatus);

  const onSendMessage = (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    console.log(message);
    const data = {
      content: message,
      to: friendId || "",
      from: user?.userId || "",
      date: new Date().toISOString(),
    };
    dispatch(saveNewMessage(data));
    if (status === "succeeded") socket.emit("message_to_friend", data);

    setMessage("");
  };

  useEffect(() => {
    socket.on("message_from_friend", (data) => {
      dispatch(
        fetchUser({ username: user?.username || "", userId: user?.userId })
      );
    });
  }, [socket]);

  return (
    <section className="messagePageSection">
      <article className="messagesExcerptsArticle">
        <ConversationExcerpts />
      </article>
      <article className="messageArticle">
        <h2>{friend?.firstname}</h2>
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
