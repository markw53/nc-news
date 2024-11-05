function VoteSection({ votes, handleVote, hasVoted, error }) {
    return (
      <div className="vote-section">
        <p>Votes: {votes}</p>
        <button onClick={() => handleVote(1)} disabled={hasVoted}>Upvote</button>
        <button onClick={() => handleVote(-1)} disabled={hasVoted}>Downvote</button>
        {error && <p className="error">{error}</p>}
      </div>
    );
  }
  
  export default VoteSection;
  