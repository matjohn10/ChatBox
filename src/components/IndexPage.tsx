import { Link } from "react-router-dom";

const IndexPage = () => {
  return (
    <section className="indexSection">
      <article className="welcomeArticle">
        <div>
          <h2>Welcome to my Chatting App!</h2>
          <p>Start chatting with your friends now.</p>
          <Link to="/login" className="indexStartBtn">
            Start
          </Link>
        </div>
      </article>
      <article className="imageIndexArticle"></article>
    </section>
  );
};

export default IndexPage;
