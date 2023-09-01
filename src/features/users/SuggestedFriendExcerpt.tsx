import type { User } from "../../app/userHook";

interface Props {
  user: User;
}

const SuggestedFriendExcerpt = ({ user }: Props) => {
  return <div>{user.firstname}</div>;
};

export default SuggestedFriendExcerpt;
