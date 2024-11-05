import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchArticles } from "./utils/api";
import ArticlesList from "./components/ArticlesList";
import ArticleDetail from "./components/ArticleDetail";
import './App.css';

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles()
      .then((fetchedArticles) => {
        setArticles(fetchedArticles);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
      });
  }, []);

  return (
    <Router>
      <div className="App">
        <header>
          <h1>Article List</h1>
        </header>
        <Routes>
          <Route path="/" element={<ArticlesList articles={articles} />} />
          <Route path="/articles/:article_id" element={<ArticleDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
