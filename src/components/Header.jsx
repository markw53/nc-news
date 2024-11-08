import React from "react";

const Header = ({
  topic,
  sortBy,
  order,
  handleSortChange,
  handleOrderToggle
}) => {
  return (
    <header aria-labelledby="topic-header" className="header-container">
      <h1>NC News</h1>
      <section className="sort-controls" aria-labelledby="sort-controls-header">
        <h3 id="sort-controls-header" className="visually-hidden"></h3>
        <label htmlFor="sort-by">Sort by:</label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={handleSortChange}
          aria-label="Sort articles by"
        >
          <option value="created_at">Date</option>
          <option value="comment_count">Comment Count</option>
          <option value="votes">Votes</option>
        </select>
        <button
          onClick={handleOrderToggle}
          aria-label={`Toggle order to ${
            order === "asc" ? "descending" : "ascending"
          }`}
        >
          {order === "asc" ? "Ascending" : "Descending"}
        </button>
      </section>
    </header>
  );
};

export default Header;
