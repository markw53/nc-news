const Home = () => {
  return (
    <>
      <main>
        <p>
          At NC-News we are dedicated to providing you with the most up-to-date
          articles on the topics you want to read about.
        </p>

        <img id="cover_img" src="https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?w=700&h=700"
        style={{
          width: '60%',
          borderRadius: '10px',
          border: '4px solid #ccc',
          padding: '5px',
        }}
        />

        <p>
          On our site you'll find articles for a popular range of topics which
          our writers have curated for your pleasure. They have been thoroughly
          vetted and we hope that you enjoy reading them just as much as we
          enjoyed writing them. Please feel free to leave us comments or
          upvote/downvote on articles, we would love to hear which are your
          favourites
        </p>
      </main>
    </>
  );
};

export default Home;
