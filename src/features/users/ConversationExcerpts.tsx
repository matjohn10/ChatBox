import { useAppSelector } from "../../app/hooks";
import { getConversations } from "./userSlice";
import MessageExcerpt from "../messages/MessageExcerpt";

const ConversationExcerpts = () => {
  const conversations = useAppSelector(getConversations) || [];
  const renderedMessages = conversations.map((conversation) => (
    <MessageExcerpt conversation={conversation} />
  ));
  return (
    <div className="conversationExcerptsDiv">
      <h2>Conversations</h2>
      <div className="messagesDiv">{renderedMessages}</div>
    </div>
  );
};

export default ConversationExcerpts;
