import { Socket } from "socket.io-client";
import { useState, useEffect } from "react";

interface Props {
  socket: Socket;
}

interface Message {
  message: string;
  room: string;
  typing: boolean;
}

interface Typing {
  typing: boolean;
}

const Test = ({ socket }: Props) => {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [joinedRoom, setJoinedRoom] = useState("");
  const [typing, setTyping] = useState(false);
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);
  const onChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
    socket.emit("isTyping", { typing: true, message: "", room });
  };
  const onRoomChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setRoom(e.currentTarget.value);

  useEffect(() => {
    socket.on("receive", (data: Message) => {
      setReceivedMessages((prev) => [...prev, data.message]);
      setTyping(data.typing);
    });
    socket.on("isTyping", (data: Message) => {
      setTyping(data.typing);
    });
    return function cleanup() {
      socket.removeListener("receive");
    };
  }, [socket]);

  const renderedReceivedMessages = receivedMessages.map((message) => (
    <p key={Math.random()}>{message}</p>
  ));

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    socket.connect();
  };

  const handleSend = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    socket.emit("message", { message, room, typing: false });
    setMessage("");
  };

  const onRoomJoin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    socket.emit("room", { room });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      Test
      <button
        type="button"
        onClick={(e) => handleClick(e)}
        style={{ width: "auto", alignSelf: "flex-start" }}
      >
        Connect
      </button>
      <form>
        <label htmlFor="room">Room:</label>
        <input
          type="text"
          id="room"
          name="room"
          value={room}
          onChange={onRoomChange}
        />
        <button type="button" onClick={onRoomJoin}>
          Join Room
        </button>
      </form>
      <form>
        <label htmlFor="testMessage">Send: </label>
        <input
          type="text"
          id="testMessage"
          name="testMessage"
          value={message}
          onChange={onChangeMessage}
        />
        <button
          type="button"
          onClick={(e) => {
            handleSend(e);
          }}
        >
          Send
        </button>
      </form>
      {typing ? <p>Typing....</p> : <></>}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2>{}</h2>
        {renderedReceivedMessages}
      </div>
    </div>
  );
};

export default Test;
