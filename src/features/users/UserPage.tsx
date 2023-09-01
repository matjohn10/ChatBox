import { useAppSelector } from "../../app/hooks";
import { getUser, getAllUsers } from "./userSlice";
import ProfileInfoSection from "./ProfileInfoSection";
import ProfileNavSection from "./ProfileNavSection";

const UserPage = () => {
  const user = useAppSelector(getUser);
  const users = useAppSelector(getAllUsers);
  const renderedUsers = users?.map((user) => (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      key={Math.random()}
    >
      <p>
        {user.firstname}&nbsp;{user.lastname}
      </p>
      <p>{user.username}</p>
    </div>
  ));
  return (
    <>
      <ProfileNavSection />
      <div className="profileMainContainer">
        <ProfileInfoSection user={user} />
      </div>
    </>
  );
};

export default UserPage;
