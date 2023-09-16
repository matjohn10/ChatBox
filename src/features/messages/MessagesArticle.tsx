import { useAppSelector } from "../../app/hooks";
import { Conversation } from "../../app/userHook";
import { getFriendById } from "../users/userSlice";
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
    (a, b) => b.date.localeCompare(a.date)
  );
  const renderedMessages = allmessagesSortedbyDate.map((message) => {
    // const from = useAppSelector((state) =>
    //   getFriendById(state, message.userId || "")
    // );
    // const profileBubble = (
    //   <div className="profileTextMessageImage">
    //     <p>{from?.firstname.slice(0, 1).toUpperCase()}</p>
    //   </div>
    // );
    return (
      <div
        className={message.userId ? "receivedMessage" : "sentMessage"}
        key={Math.random()}
      >
        {/* {message.userId ? profileBubble : <></>} */}
        <div className="textMessage">
          <p>{message.content}</p>
          <TimeAgo timestamp={message.date} />
        </div>
      </div>
    );
  });
  return <>{renderedMessages}</>;
};

export default MessagesArticle;
