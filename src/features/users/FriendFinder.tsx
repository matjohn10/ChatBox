import { useAppSelector, randomUsers } from "../../app/hooks";
import { getAllUsers } from "./userSlice";
import SuggestedFriendExcerpt from "./SuggestedFriendExcerpt";
import { useState } from "react";

const FriendFinder = () => {
  const users = useAppSelector(getAllUsers);
  const [searchParam, setSearchParam] = useState("");
  const onChangeParam = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchParam(e.currentTarget.value);
  const matchingUsers = users?.filter(
    (user) =>
      user.userId.includes(searchParam) ||
      user.firstname.includes(searchParam) ||
      user.lastname.includes(searchParam)
  );
  let suggestedUsers = matchingUsers
    ? matchingUsers.map((user) => <SuggestedFriendExcerpt user={user} />)
    : [<></>];

  return (
    <article className="friendFinderArticle">
      <div className="searchFriendDiv">
        <form>
          <label htmlFor="searchParam">Search: </label>
          <input
            type="text"
            id="searchParam"
            name="searchParam"
            value={searchParam}
            onChange={onChangeParam}
            placeholder="Name or ID"
          />
        </form>
      </div>
      <div className="suggestedFriendsDiv">{suggestedUsers}</div>
    </article>
  );
};

export default FriendFinder;
