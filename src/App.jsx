import { useEffect, useState } from "react";
import { fetchArticles } from "./utils/api";
import ArticlesList from "./components/ArticlesList";

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
    <div className="App">
      <h1>Article List</h1>
      <ArticlesList articles={articles} />
    </div>
  );
}

export default App;
