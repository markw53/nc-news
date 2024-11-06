import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTopics } from "../utils/api";
import "./Topics.css";

function Topics() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTopics()
      .then((data) => {
        console.log("Data from API:", data);
        setTopics(data.topics || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching topics:", error);
        setError("Failed to load topics, Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading topics...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="topics-list">
      <h2>Select a Topic</h2>
      {topics.length > 0 ? (
        topics.map((topic) => (
          <Link
            key={topic.slug}
            to={`/topics/${topic.slug}`}
            className="topic-link"
          >
            <p>{topic.slug}</p>
            <span>{topic.description}</span>
          </Link>
        ))
      ) : (
        <p>No topics available.</p>
      )}
    </div>
  );
}

export default Topics;
