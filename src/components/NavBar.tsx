import { Link } from "react-router-dom";

const NavBar = ({ user }) => (
  <nav className="bg-nc-primary text-white flex justify-between items-center p-3 shadow-md">
    <ul className="flex gap-4">
      <li>
        <Link to="/" className="hover:text-nc-accent">Home</Link>
      </li>
      <li>
        <Link to="/articles" className="hover:text-nc-accent">Articles</Link>
      </li>
      <li>
        <Link to="/topics" className="hover:text-nc-accent">Topics</Link>
      </li>
      <li>
        <Link to="/users" className="hover:text-nc-accent">
          {user ? "Switch User" : "Sign In"}
        </Link>
      </li>
    </ul>
    {user && (
      <div className="flex items-center gap-2">
        <img
          src={user.avatar_url}
          alt={user.username}
          className="w-8 h-8 rounded-full border-2 border-nc-accent"
        />
        <span className="font-bold">{user.username}</span>
      </div>
    )}
  </nav>
);

export default NavBar;