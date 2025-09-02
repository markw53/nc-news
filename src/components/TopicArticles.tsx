import { useParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";

type Topic = {
  slug: string;
  description: string;
};

type Article = {
  article_id: string;
  topic: string;
  title: string;
  author: string;
  created_at: string | { seconds: number };
  votes: number;
  comment_count: number;
  article_img_url?: string;
};

type Props = {
  topics: Topic[];
  articles: Article[];
};

function TopicArticles({ topics, articles }: Props) {
  const { topic } = useParams();

  if (!topic) return <p className="p-4">No topic selected.</p>;

  const validTopic = topics.find((t) => t.slug === topic);
  if (!validTopic) return <p className="p-4">Invalid topic.</p>;

  const filteredArticles = articles.filter((a) => a.topic === topic);

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-3">Articles on “{topic}”</h2>
      {filteredArticles.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-5">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.article_id} article={article} />
          ))}
        </div>
      ) : (
        <p>No articles available for this topic.</p>
      )}
    </div>
  );
}

export default TopicArticles;