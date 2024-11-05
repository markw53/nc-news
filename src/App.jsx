import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchArticles, fetchTopics } from "./utils/api";
import ArticlesList from "./components/ArticlesList";
import ArticleDetail from "./components/ArticleDetail";
import Topics from "./components/Topics";
import TopicArticles from "./components/TopicArticles";
import './App.css';

function App() {
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchArticles()
      .then((fetchedArticles) => {
        setArticles(fetchedArticles);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
      });
  }, []);

  useEffect(() => {
    fetchTopics()
      .then((fetchedTopics) => {
        setTopics(fetchedTopics);
      })
      .catch ((error) => {
        console.error("Error fetching topics:", error);
      });
  }, []);

  return (
    <Router>
      <div className="App">
        <header>
          <h1>Article List</h1>
          <nav>
            <a href='/'>Home</a> | <a href='/topics'>Topics</a>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<ArticlesList articles={articles} />} />
          <Route path="/articles/:article_id" element={<ArticleDetail />} />
          <Route path="/topics" element={<Topics topics={topics} />} />
          <Route path="topics/:topic" element={<TopicArticles />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
