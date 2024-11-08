function VoteSection({ votes, handleVote, hasVoted, error }) {
  return (
    <div
      className="vote-section"
      role="region"
      aria-labelledby="vote-section-header"
    >
      <h3 id="vote-section-header" className="visually-hidden">
        Voting Section
      </h3>
      <p aria-live="polite">Votes: {votes}</p>

      <button
        onClick={() => handleVote(1)}
        disabled={hasVoted}
        className="vote"
        aria-label="Upvote"
        aria-pressed={hasVoted}
      >
        👍
      </button>

      <button
        onClick={() => handleVote(-1)}
        disabled={hasVoted}
        className="vote"
        aria-label="Downvote"
        aria-pressed={hasVoted}
      >
        👎
      </button>

      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}
    </div>
  );
}

export default VoteSection;
