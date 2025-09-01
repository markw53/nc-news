import { useSearchParams } from "react-router-dom";

const Header = ({ topic }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  return (
    <header className="flex flex-col items-center gap-4 p-4 bg-nc-light">
      <h1 className="text-4xl font-heading text-nc-secondary">NC News</h1>
      {topic && (
        <p className="text-nc-dark">
          Viewing articles on <strong>{topic}</strong>
        </p>
      )}
      <div className="flex items-center gap-2">
        <label className="font-semibold">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSearchParams({ sort_by: e.target.value, order })}
          className="border border-gray-400 rounded px-2 py-1"
        >
          <option value="created_at">Date</option>
          <option value="comment_count">Comments</option>
          <option value="votes">Votes</option>
        </select>
        <button
          onClick={() =>
            setSearchParams({ sort_by: sortBy, order: order === "asc" ? "desc" : "asc" })
          }
          className="px-2 py-1 border rounded bg-nc-primary text-white hover:bg-nc-secondary"
        >
          {order === "asc" ? "Ascending" : "Descending"}
        </button>
      </div>
    </header>
  );
};

export default Header;