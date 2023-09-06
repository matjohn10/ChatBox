import { useAppSelector } from "../../app/hooks";
import { getAllUsers } from "./userSlice";
import SuggestedFriendExcerpt from "./SuggestedFriendExcerpt";
import { useState } from "react";
import { Socket } from "socket.io-client";

interface Props {
  socket: Socket;
}

const FriendFinder = ({ socket }: Props) => {
  const users = useAppSelector(getAllUsers);
  const [searchParam, setSearchParam] = useState("");
  const onChangeParam = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchParam(e.currentTarget.value);
  const matchingUsers =
    searchParam &&
    users?.filter((user) =>
      user.username
        .concat(user.firstname, user.lastname)
        .toLowerCase()
        .includes(searchParam.toLowerCase())
    );
  let suggestedUsers = matchingUsers
    ? matchingUsers.map((user) => (
        <SuggestedFriendExcerpt
          friend={user}
          key={Math.random()}
          socket={socket}
        />
      ))
    : [<></>];

  return (
    <article className="friendFinderArticle">
      <div className="searchFriendDiv">
        <h2>Search New Friends</h2>
        <form>
          <label htmlFor="searchParam">Search: </label>
          <input
            type="text"
            id="searchParam"
            name="searchParam"
            value={searchParam}
            onChange={onChangeParam}
            placeholder="Name or Username"
          />
        </form>
      </div>
      <div className="suggestedFriendsDiv">{suggestedUsers}</div>
    </article>
  );
};

export default FriendFinder;
