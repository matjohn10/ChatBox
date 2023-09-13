import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getUser, saveSocketSession, fetchUser } from "./userSlice";
import ProfileInfoSection from "./ProfileInfoSection";
import ProfileNavSection from "./ProfileNavSection";
import CreateRoom from "../rooms/CreateRoom";
import { useState, useEffect } from "react";
import { Socket } from "socket.io-client";
import { Friend } from "../../app/userHook";

interface Props {
  socket: Socket;
}

const UserPage = ({ socket }: Props) => {
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const [selectedMenu, setSelectedMenu] = useState("3");
  const [isCreateChat, setIsCreateChat] = useState(false);

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      dispatch(
        saveSocketSession({ userId: user?.userId || "", socketId: socket.id })
      );
    });
    socket.emit("add_personal_room", { room: user?.userId });

    //listening for new friend
    socket.on("friend_added", ({ user }: { user: Friend }) => {
      alert(
        `You have a new friend. ${user.firstname} ${user.lastname} (${user.username}) added you as a friend.`
      );
      dispatch(fetchUser({ username: user.username, userId: user.userId })); // change that password for email, if password not given
    });

    //listening for group chat
    socket.on("added-to-chat", (data) => {});
  }, [socket]);

  return (
    <>
      <ProfileNavSection
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />
      <div className="profileMainContainer">
        <ProfileInfoSection
          user={user}
          selectedMenu={selectedMenu}
          setIsCreateChat={setIsCreateChat}
          socket={socket}
        />
      </div>
      {isCreateChat ? (
        <CreateRoom
          user={user}
          socket={socket}
          setIsCreateChat={setIsCreateChat}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default UserPage;
