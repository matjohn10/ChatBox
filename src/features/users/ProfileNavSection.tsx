import * as Unicons from "@iconscout/react-unicons";

interface Props {
  selectedMenu: string;
  setSelectedMenu: React.Dispatch<React.SetStateAction<string>>;
}
const ProfileNavSection = ({ selectedMenu, setSelectedMenu }: Props) => {
  const onMenuClick = (key: string) => {
    setSelectedMenu(key);
  };
  return (
    <section className="profileNavSection">
      <ul>
        <li
          onClick={() => onMenuClick("1")}
          className={selectedMenu === "1" ? "selected" : ""}
        >
          <Unicons.UilUser color="whitesmoke" />
          &nbsp;&nbsp; Profile Settings
        </li>
        <li
          onClick={() => onMenuClick("2")}
          className={selectedMenu === "2" ? "selected" : ""}
        >
          <Unicons.UilUsersAlt color="whitesmoke" />
          &nbsp;&nbsp; Friends
        </li>
        <li
          onClick={() => onMenuClick("3")}
          className={selectedMenu === "3" ? "selected" : ""}
        >
          <Unicons.UilCommentsAlt color="whitesmoke" />
          &nbsp;&nbsp; Conversations
        </li>
        <li
          onClick={() => onMenuClick("4")}
          className={selectedMenu === "4" ? "selected" : ""}
        >
          <Unicons.UilUserPlus color="whitesmoke" />
          &nbsp;&nbsp; Friend Finder
        </li>
        <li
          onClick={() => onMenuClick("5")}
          className={selectedMenu === "5" ? "selected" : ""}
        >
          <Unicons.UilCloudLock color="whitesmoke" />
          &nbsp;&nbsp; Share ID
        </li>
      </ul>
    </section>
  );
};

export default ProfileNavSection;
