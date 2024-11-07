import { Link } from "react-router-dom";

const NavBar = ({ user }) => {
  if (user) {
    return (
      <nav>
        <Link className="link" to={"/"}>
          Home
        </Link>{" "}
        <Link className="link" to={"/articles"}>
          Articles
        </Link>{" "}
        <Link className="link" to={"/topics"}>
          Topics
        </Link>{" "}
        <Link className="link" to={"/users"}>
          Sign in
        </Link>
        <img alt={user.username} src={user.avatar_url} />
      </nav>
    );
  }
  return (
    <nav>
      <Link className="link" to={"/"}>
        Home
      </Link>{" "}
      <Link className="link" to={"/articles"}>
        Articles
      </Link>{" "}
      <Link className="link" to={"/topics"}>
        Topics
      </Link>{" "}
      <Link className="link" to={"/users"}>
        Sign in
      </Link>
    </nav>
  );
};

export default NavBar;
