import { useAppSelector } from "../../app/hooks";
import { getConversations } from "./userSlice";
import MessageExcerpt from "../messages/MessageExcerpt";
import * as Unicons from "@iconscout/react-unicons";

const ConversationExcerpts = (props: {
  setIsCreateChat: React.Dispatch<React.SetStateAction<boolean>>;
  plusChatOn: boolean;
  isChatRoom: boolean;
}) => {
  const conversations = useAppSelector(getConversations) || [];
  const renderedMessages = conversations.map((conversation) => (
    <MessageExcerpt conversation={conversation} />
  ));

  const onAddConversation = () => {
    props.setIsCreateChat((prev) => !prev);
  };
  return (
    <div
      className="conversationExcerptsDiv"
      key={Math.random()}
      id="chatRoomExcerptsDiv"
    >
      <h2>
        Conversations{" "}
        {props.plusChatOn ? (
          <Unicons.UilPlusCircle
            color="var(--accent)"
            className="addFriendBtn"
            onClick={onAddConversation}
          />
        ) : (
          <></>
        )}
      </h2>
      <div
        className="messagesDiv"
        id={props.isChatRoom ? "chatRoomExcerpt" : ""}
        key={Math.random()}
      >
        {renderedMessages}
      </div>
    </div>
  );
};

export default ConversationExcerpts;
