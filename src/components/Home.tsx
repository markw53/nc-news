const Home = () => {
  return (
    <main className="max-w-[800px] mx-auto flex flex-col items-center gap-6 py-6 px-4">
      <p className="text-lg text-gray-700 leading-relaxed text-center">
        At <strong>NC-News</strong> we are dedicated to providing you with the most up-to-date
        articles on the topics you want to read about.
      </p>

      <figure className="w-3/5">
        <img
          src="https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?w=700&h=700"
          alt="Stack of newspapers representing the latest news"
          className="w-full rounded-lg border-4 border-gray-300 p-1 shadow-md"
        />
        <figcaption className="sr-only">
          Stay updated with curated articles on your favorite topics
        </figcaption>
      </figure>

      <p className="text-lg text-gray-700 leading-relaxed text-center">
        On our site you&apos;ll find articles for a wide range of topics curated by
        our writers for your pleasure. They’ve been thoroughly vetted and we hope
        you enjoy reading them just as much as we enjoyed writing them. <br />
        Please feel free to leave us comments or upvote/downvote on articles —
        we’d love to hear which are your favourites.
      </p>
    </main>
  );
};

export default Home;