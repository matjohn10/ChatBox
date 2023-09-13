import { Friend, Room, User } from "../../app/userHook";
import { addRoom, getFriends, getUser } from "../users/userSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useState } from "react";
import * as Unicons from "@iconscout/react-unicons";
import { nanoid } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

interface Props {
  socket: Socket;
}

const CreateGroup = ({ socket }: Props) => {
  const friends = useAppSelector(getFriends);
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const [groupName, setGroupName] = useState("");
  const [toAdd, setToAdd] = useState<Friend[]>([]);

  const onGroupNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setGroupName(e.currentTarget.value);

  const onAdd = (friend: Friend) => {
    setToAdd((prev) => [...prev, friend]);
  };

  const renderedFriends = friends.map((friend) => (
    <div className="friendListForGroup">
      <p>
        {friend.firstname}&nbsp; {friend.lastname}
      </p>
      <Unicons.UilPlusCircle
        color="var(--accent)"
        size="20"
        className="addFriendBtn"
        onClick={toAdd.includes(friend) ? void 0 : () => onAdd(friend)}
      />
    </div>
  ));

  const renderedInGroup = toAdd.map((friend) => (
    <div className="friendInGroup">
      <p>
        {friend.firstname}&nbsp; {friend.lastname}
      </p>
    </div>
  ));

  const onGroupCreation = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    // will have to create id of room here
    const room: Room = {
      name: groupName,
      roomId: nanoid(),
      members: toAdd,
    };
    const data: {
      room: Room;
      user: User | null | undefined;
      date: string;
      content: string;
    } = {
      room,
      user,
      date: new Date().toISOString(),
      content: `${user?.username} created ${room.name}`,
    };
    // userSlice dispatch to post data to server for DB
    // create room in DB but also an empty conversation
    dispatch(addRoom(data));

    // socket emit to tell friends they were added in a group chat
    socket.emit("room-created", room);

    setGroupName("");
    setToAdd([]);
    // navigate to the conversation id page after added to DB
  };

  return (
    <article className="createGroupArticle">
      <form onSubmit={onGroupCreation}>
        <label htmlFor="groupName">Group Name:</label>
        <input
          type="text"
          id="groupName"
          name="groupName"
          value={groupName}
          onChange={onGroupNameChange}
        />
      </form>
      <div className="selectionMainDiv">
        <div className="selectionGroupDiv">
          <h5>All Friends</h5>
          <div className="friendsToAddDiv">{renderedFriends}</div>
        </div>
        <div className="selectionGroupDiv">
          <h5>In Group</h5>
          <div className="friendInGroupDiv">{renderedInGroup}</div>
        </div>
      </div>
      <button
        className="createGroupBtn"
        onClick={onGroupCreation}
        disabled={!groupName || toAdd.length < 2}
      >
        Create
      </button>
    </article>
  );
};

export default CreateGroup;
