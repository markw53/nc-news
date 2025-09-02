import { Link } from "react-router-dom";

type Topic = {
  slug: string;
  description: string;
};

type Props = {
  topics: Topic[];
};

function Topics({ topics }: Props) {
  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-3 text-nc-secondary">Select a Topic</h2>
      {topics.length > 0 ? (
        topics.map((t) => (
          <Link
            key={t.slug}
            to={`/topics/${t.slug}`}
            className="block m-2 p-3 border border-gray-300 rounded hover:bg-nc-light hover:border-nc-accent transition"
          >
            <p className="font-bold text-nc-primary">{t.slug}</p>
            <span className="text-gray-600">{t.description}</span>
          </Link>
        ))
      ) : (
        <p>No topics available.</p>
      )}
    </div>
  );
}

export default Topics;