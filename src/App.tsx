import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchArticles, fetchTopics } from "./utils/api";
import {
  Header,
  Home,
  NavBar,
  ArticlesList,
  ArticleDetail,
  Topics,
  TopicArticles,
  ErrorMessage,
  SignIn,
} from "./components";

import "./App.css";

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
            "https://sysnative.nyc3.cdn.digitaloceanspaces.com/data/avatars/h/33/33931.jpg?1563048380",
        };
  });

  useEffect(() => {
    fetchArticles().then(({ articles }) => setArticles(articles || []));
  }, []);

  useEffect(() => {
    fetchTopics().then((t) => setTopics(t || []));
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header topic={null} />
        <NavBar user={user} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<ArticlesList articles={articles} />} />
          <Route path="/articles/:article_id"
            element={<ArticleDetail user={user} articles={articles} />}
          />          
          {/* ✅ pass topics to components */}
          <Route path="/topics" element={<Topics topics={topics} />} />
          <Route path="/topics/:topic" element={<TopicArticles topics={topics} articles={articles} />} />

          <Route path="/users" element={<SignIn user={user} setUser={setUser} />} />
          <Route path="*" element={<ErrorMessage message="Page not found" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;