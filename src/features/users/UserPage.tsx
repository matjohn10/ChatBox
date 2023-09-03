import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getUser, saveSocketSession } from "./userSlice";
import ProfileInfoSection from "./ProfileInfoSection";
import ProfileNavSection from "./ProfileNavSection";
import { useState, useEffect } from "react";
import { Socket } from "socket.io-client";

interface Props {
  socket: Socket;
}

const UserPage = ({ socket }: Props) => {
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const [selectedMenu, setSelectedMenu] = useState("3");

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      dispatch(
        saveSocketSession({ userId: user?.userId || "", socketId: socket.id })
      );
    });
    socket.emit("add_personal_room", { room: user?.userId });
  }, [socket]);

  return (
    <>
      <ProfileNavSection
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />
      <div className="profileMainContainer">
        <ProfileInfoSection user={user} selectedMenu={selectedMenu} />
      </div>
    </>
  );
};

export default UserPage;
