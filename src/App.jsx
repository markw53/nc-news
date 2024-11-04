import React, { useEffect, useState } from 'react';
import { fetchArticles } from './utils/api';
import ArticlesList from './components/ArticlesList';
import './App.css';

function App() {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadArticles = async () => {
            try {
                const articlesData = await fetchArticles();
                setArticles(articlesData);
            } catch (err) {
                setError("Failed to load articles.");
            }
        };
        loadArticles();
    }, []);

    return (
        <div className="App">
            <h1>Article Viewer</h1>
            {error ? <p>{error}</p> : <ArticlesList articles={articles} />}
        </div>
    );
}

export default App;
