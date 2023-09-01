import * as Unicons from "@iconscout/react-unicons";
const ProfileNavSection = () => {
  return (
    <section className="profileNavSection">
      <ul>
        <li>
          <Unicons.UilUser color="whitesmoke" />
          &nbsp;&nbsp; Profile Settings
        </li>
        <li>
          <Unicons.UilUsersAlt color="whitesmoke" />
          &nbsp;&nbsp; Friends
        </li>
        <li>
          <Unicons.UilCommentsAlt color="whitesmoke" />
          &nbsp;&nbsp; Conversations
        </li>
        <li>
          <Unicons.UilUserPlus color="whitesmoke" />
          &nbsp;&nbsp; Friend Finder
        </li>
        <li>
          <Unicons.UilCloudLock color="whitesmoke" />
          &nbsp;&nbsp; Share ID
        </li>
      </ul>
    </section>
  );
};

export default ProfileNavSection;
