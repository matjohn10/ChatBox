import { Conversation } from "../../app/userHook";
import TimeAgo from "./TimeAgo";

interface Props {
  conversation: Conversation | undefined;
}

const MessagesArticle = ({ conversation }: Props) => {
  const allmessagesSortedbyDate: {
    userId?: string;
    content: string;
    date: string;
  }[] = [...(conversation?.sent || []), ...(conversation?.received || [])].sort(
    (a, b) => a.date.localeCompare(b.date)
  );
  const renderedMessages = allmessagesSortedbyDate.map((message) => (
    <div
      className={message.userId ? "receivedMessage" : "sentMessage"}
      key={Math.random()}
    >
      <div className="textMessage">
        <p>{message.content}</p>
        {/* <p className="messageTime">{message.date}</p> */}
        <TimeAgo timestamp={message.date} />
      </div>
    </div>
  ));
  //   const renderedSent = conversation?.sent.map((sent) => (
  //     <div className="sentMessage">
  //       <div className="textMessage">{sent.content}</div>
  //     </div>
  //   ));
  //   const renderedReceived = conversation?.received.map((received) => (
  //     <div className="receivedMessage">
  //       <div className="textMessage">{received.content}</div>
  //     </div>
  //   ));
  return <>{renderedMessages}</>;
};

export default MessagesArticle;
