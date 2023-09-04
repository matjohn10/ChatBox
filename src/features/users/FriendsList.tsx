import type { User } from "../../app/userHook";
import { getFriends } from "./userSlice";
import { useAppSelector } from "../../app/hooks";
import FriendExcerpt from "./FriendExcerpt";
import { friendLetterObj } from "../../app/userHook";

interface Props {
  user: User | null | undefined;
}

const FriendsList = ({}: Props) => {
  const friends = useAppSelector(getFriends) || [];
  const sortedLetters = friendLetterObj(friends);

  const renderedFriends = Array.from(Object.keys(sortedLetters)).map(
    (letter) => (
      <div className="letterDiv">
        {sortedLetters[letter as keyof typeof sortedLetters].length ? (
          <>
            <h3>{letter}</h3>
            <div className="straightLine"></div>
            <div className="friendsExcerptsDiv">
              {sortedLetters[letter as keyof typeof sortedLetters].map(
                (friend) => (
                  <FriendExcerpt friend={friend} />
                )
              )}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    )
  );

  return (
    <div className="renderedFriendsList">
      <h2>Friends</h2>
      {renderedFriends}
    </div>
  );
};

export default FriendsList;
