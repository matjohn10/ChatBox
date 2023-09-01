import { useAppSelector } from "../../app/hooks";
import { getUser } from "./userSlice";
import ProfileInfoSection from "./ProfileInfoSection";
import ProfileNavSection from "./ProfileNavSection";
import { useState } from "react";

const UserPage = () => {
  const user = useAppSelector(getUser);
  const [selectedMenu, setSelectedMenu] = useState("3");
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
          setSelectedMenu={setSelectedMenu}
        />
      </div>
    </>
  );
};

export default UserPage;
