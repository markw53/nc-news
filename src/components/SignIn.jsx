import { useState, useEffect } from "react";

import * as api from "../utils/api";

const SignIn = ({ user, setUser }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUser({ name: storedUser });
    }

    setIsLoading(true);
    api
      .fetchUsers()
      .then((response) => {
        setUsers(response);
        setIsLoading(false);
        setError(null);
      })
      .catch((error) => {
        setIsLoading(false);
        setError("Failed to load users.");
      });
  }, [setUser]);

  const handleSignIn = (user) => {
    localStorage.setItem("username", user.name);
    setUser(user);
  };

  const handleSignOut = () => {
    localStorage.removeItem("username");
    setUser(null);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      {user ? (
        <button onClick={handleSignOut}>Sign out</button>
      ) : (
        <ul>
          {users.map((user) => {
            return (
              <li className="review_card" key={user.name}>
                <img
                  alt={user.name}
                  src={user.avatar_url}
                  className="thumbnail"
                />
                <p>
                  {user.name}
                  <br />
                  <button onClick={() => handleSignIn(user)}>Sign in</button>
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
};

export default SignIn;
