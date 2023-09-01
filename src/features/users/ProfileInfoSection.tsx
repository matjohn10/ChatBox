import type { User } from "../../app/userHook";

interface Props {
  user: User | null | undefined;
}

const ProfileInfoSection = ({ user }: Props) => {
  return (
    <section className="profileInfoSection">
      <article className="profileInfoArticle">
        <div className="profileBadge" style={{ color: user?.bgColor }}>
          {user?.firstname.slice(0, 1)}
        </div>
        <div className="profileInfo">
          <p>
            <strong>Name:</strong>
            &nbsp;{" "}
            <u>
              {user?.firstname}&nbsp; {user?.lastname}
            </u>
          </p>
          <p>
            <strong>Username:</strong>&nbsp; <u>{user?.username}</u>
          </p>
          <p>
            <strong>Email:</strong>&nbsp; <u>{user?.email}</u>
          </p>
        </div>
      </article>
      <article className="accountLogicsArticle">
        Stuff selected from side menu.
      </article>
    </section>
  );
};

export default ProfileInfoSection;
