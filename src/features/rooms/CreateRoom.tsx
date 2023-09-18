import * as Unicons from "@iconscout/react-unicons";
import { useState } from "react";
import FriendList from "../users/FriendList";
import CreateGroup from "./CreateGroup";
import { User } from "../../app/userHook";
import { Socket } from "socket.io-client";

interface Props {
  setIsCreateChat: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null | undefined;
  socket: Socket;
}

const CreateRoom = ({ setIsCreateChat, user, socket }: Props) => {
  const [modeSelected, setModeSelected] = useState(0);
  const onCloseCreate = () => {
    setIsCreateChat((prev) => !prev);
  };
  const onSelectModeHandle = (mode: number) => {
    setModeSelected(mode);
  };
  return (
    <section className="createRoomSection">
      <article className="createConvoTitle">
        <h3>Create Conversation</h3>
        <div>
          <Unicons.UilTimesCircle
            color="var(--accent)"
            onClick={onCloseCreate}
            className="addFriendBtn"
          />
        </div>
      </article>
      <article className="selectCreateMode">
        <div
          className={
            modeSelected === 0 ? "createModeDiv modeSelected" : "createModeDiv"
          }
          onClick={() => onSelectModeHandle(0)}
        >
          <h5>Friend</h5>
        </div>
        <div
          className={
            modeSelected === 1 ? "createModeDiv modeSelected" : "createModeDiv"
          }
          onClick={() => onSelectModeHandle(1)}
        >
          <h5>Group</h5>
        </div>
      </article>
      <article className="optionsChatDiv">
        {modeSelected === 0 ? <FriendList /> : <CreateGroup socket={socket} />}
      </article>
    </section>
  );
};

export default CreateRoom;
