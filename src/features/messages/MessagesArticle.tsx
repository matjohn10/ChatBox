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
        <TimeAgo timestamp={message.date} />
      </div>
    </div>
  ));
  return <>{renderedMessages}</>;
};

export default MessagesArticle;
