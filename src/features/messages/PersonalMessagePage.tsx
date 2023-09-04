import { useParams } from "react-router-dom";

const PersonalMessagePage = () => {
  const { friendId } = useParams();
  return <div>{friendId}</div>;
};

export default PersonalMessagePage;
