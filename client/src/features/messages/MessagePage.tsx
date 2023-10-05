import { useState } from "react";
import { addMessage, getMessages } from "./messagesSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { parseISO, formatDistanceToNow } from "date-fns";

const MessagePage = () => {
  const [message, setMessage] = useState<string>("");
  const dispatch = useAppDispatch();
  const onChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMessage(e.currentTarget.value);

  const messages = useAppSelector(getMessages);
  const renderedMessages = messages?.map((message) => (
    <p key={Math.random()}>
      {message.content} -- {formatDistanceToNow(parseISO(message.date))}
      {` -- (${message.userId})`}
    </p>
  ));

  const onSendMessageClick = (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (message) dispatch(addMessage({ message }));
    setMessage("");
  };

  return (
    <section className="message-section">
      <h2>Message</h2>
      <div className="messagesBox">{renderedMessages}</div>
      <form
        onSubmit={(e) => {
          onSendMessageClick(e);
        }}
      >
        <label htmlFor="message"></label>
        <input
          type="text"
          id="message"
          name="message"
          value={message}
          onChange={onChangeMessage}
        />
        <button
          type="button"
          onClick={(e) => onSendMessageClick(e)}
          disabled={!message}
        >
          Send
        </button>
      </form>
    </section>
  );
};

export default MessagePage;
