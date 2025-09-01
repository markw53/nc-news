import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchArticles, fetchTopics } from "./utils/api";
import Header from "./components/Header";
import Home from "./components/Home";
import NavBar from "./components/Nav_Bar";
import ArticlesList from "./components/ArticlesList";
import ArticleDetail from "./components/ArticleDetail";
import Topics from "./components/Topics";
import TopicArticles from "./components/TopicArticles";
import ErrorMessage from "./components/ErrorMessage";
import SignIn from "./components/SignIn";
import "./output.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser
      ? JSON.parse(savedUser)
      : {
          username: "guest",
          name: "Guest",
          avatar_url:
            "https://sysnative.nyc3.cdn.digitaloceanspaces.com/data/avatars/h/33/33931.jpg?1563048380"
        };
  });

  useEffect(() => {
    fetchArticles()
      .then(({ articles }) => {
        setArticles(articles || []);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
      });
  }, []);

  useEffect(() => {
    fetchTopics()
      .then((fetchedTopics) => {
        setTopics(fetchedTopics || []);
      })
      .catch((error) => {
        console.error("Error fetching topics:", error);
      });
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <NavBar user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<ArticlesList />} />
          <Route
            path="/articles/:article_id"
            element={<ArticleDetail user={user} />}
          />
          <Route path="/topics" element={<Topics />} />
          <Route path="/topics/:topic" element={<TopicArticles />} />
          <Route
            path="/users"
            element={<SignIn user={user} setUser={setUser} />}
          />
          {/* ✅ Provide explicit message prop for catch-all error route */}
          <Route path="*" element={<ErrorMessage message="Page not found" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;