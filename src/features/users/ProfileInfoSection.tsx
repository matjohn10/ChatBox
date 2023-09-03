import type { User } from "../../app/userHook";
import ProfileSettings from "./ProfileSettings";
import FriendsList from "./FriendsList";
import FriendFinder from "./FriendFinder";
import ConversationExcerpts from "./ConversationExcerpts";
import ShareId from "./ShareId";
import { Socket } from "socket.io-client";

interface Props {
  user: User | null | undefined;
  selectedMenu: string;
  socket: Socket;
}

const ProfileInfoSection = ({ user, selectedMenu, socket }: Props) => {
  const menuItems = [
    <ProfileSettings />,
    <FriendsList />,
    <ConversationExcerpts />,
    <FriendFinder socket={socket} />,
    <ShareId />,
  ];
  return (
    <section className="profileInfoSection">
      <article className="profileInfoArticle">
        <div className="profileBadge" style={{ color: user?.bgColor }}>
          {user?.firstname.slice(0, 1)}
        </div>
        <div className="profileInfo">
          <p>
            <strong>Name:</strong>
            &nbsp;{" "}
            <u>
              {user?.firstname}&nbsp; {user?.lastname}
            </u>
          </p>
          <p>
            <strong>Username:</strong>&nbsp; <u>{user?.username}</u>
          </p>
          <p>
            <strong>Email:</strong>&nbsp; <u>{user?.email}</u>
          </p>
        </div>
      </article>
      <article className="accountLogicsArticle">
        {menuItems[parseInt(selectedMenu) - 1]}
      </article>
    </section>
  );
};

export default ProfileInfoSection;
