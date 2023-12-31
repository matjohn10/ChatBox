import { Link } from "react-router-dom";

const IndexPage = () => {
  const user = localStorage.getItem("user"); //useAppSelector(getUser);
  return (
    <section className="indexSection">
      <article className="welcomeArticle">
        <div>
          <h2>Welcome to my ChatBox app!</h2>
          <p>Start chatting with your friends now.</p>
          {user ? (
            <></>
          ) : (
            <Link to="/login" className="indexStartBtn">
              Start
            </Link>
          )}
        </div>
      </article>
      <article className="imageIndexArticle"></article>
    </section>
  );
};

export default IndexPage;
