import type { User } from "../../app/userHook";

interface Props {
  user: User | null | undefined;
}

const ProfileInfoSection = ({ user }: Props) => {
  return (
    <section className="profileInfoSection">
      <article className="profileInfoArticle">
        <div
          className="profileBadge"
          style={{ backgroundColor: user?.bgColor }}
        >
          {user?.firstname.slice(0, 1)}
        </div>
        <div className="profileInfo">
          <p>
            {user?.firstname}&nbsp; {user?.lastname}
          </p>
          <p>{user?.username}</p>
          <p>{user?.email}</p>
        </div>
      </article>
    </section>
  );
};

export default ProfileInfoSection;
