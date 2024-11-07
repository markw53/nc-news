import { useState, useEffect } from "react";

import * as api from "../utils/api";

const SignIn = ({ user, setUser }) => {
    
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    api.fetchUsers().then((response) => {
      setUsers(response);
      setIsLoading(false);
      setError(null);
    });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <main>
        <ul>
          {users.map((user) => {
            return (
              <li className="review_card" key={user.name}>
                <img
                  aly={user.name}
                  src={user.avatar_url}
                  className="thumbnail"
                />
                <p>
                  {user.name} <br />
                  <br />
                  <button onClick={() => setUser(user)}>Sign in</button>
                </p>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
};

export default SignIn;
