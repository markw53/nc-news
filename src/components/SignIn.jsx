import { useState, useEffect } from "react";
import * as api from "../utils/api";

const SignIn = ({ user, setUser }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));

    api.fetchUsers()
      .then((res) => setUsers(res || []))
      .catch(() => setError("Failed to load users"))
      .finally(() => setIsLoading(false));
  }, [setUser]);

  const handleSignIn = (u) => {
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  if (isLoading) return <p className="text-center py-4">Loading users...</p>;
  if (error) return <p className="text-nc-danger text-center">{error}</p>;

  return (
    <main className="flex flex-col items-center py-6">
      {user ? (
        <div className="flex flex-col items-center gap-2 bg-white shadow-card p-6 rounded-xl">
          <img
            src={user.avatar_url}
            alt={user.username}
            className="w-16 h-16 rounded-full border-2 border-nc-accent"
          />
          <p className="text-lg font-semibold">Signed in as {user.username}</p>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-nc-danger text-white rounded hover:bg-nc-secondary"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <ul className="flex flex-wrap gap-4 justify-center">
          {users.map((u) => (
            <li
              key={u.username}
              className="flex flex-col items-center border rounded-lg p-4 w-[150px] h-[230px] shadow-card"
            >
              <img
                src={u.avatar_url}
                alt={u.username}
                className="max-h-[100px] max-w-[150px] rounded mb-2"
              />
              <p className="text-center font-medium">{u.name}</p>
              <button
                onClick={() => handleSignIn(u)}
                className="mt-2 px-3 py-1 bg-nc-primary text-white rounded hover:bg-nc-secondary"
              >
                Sign In
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default SignIn;