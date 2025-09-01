function VoteSection({ votes = 0, handleVote, hasVoted, error }) {
  return (
    <div className="flex flex-col items-center mt-4 gap-2">
      <p className="font-bold text-lg">Votes: {votes ?? 0}</p>
      <div className="flex gap-4">
        <button
          onClick={() => handleVote(1)}
          disabled={hasVoted}
          className="w-16 h-10 rounded bg-nc-success text-white hover:bg-nc-secondary disabled:bg-gray-300"
        >
          👍
        </button>
        <button
          onClick={() => handleVote(-1)}
          disabled={hasVoted}
          className="w-16 h-10 rounded bg-nc-danger text-white hover:bg-nc-secondary disabled:bg-gray-300"
        >
          👎
        </button>
      </div>
      {error && <p className="text-nc-danger text-sm mt-2">{error}</p>}
    </div>
  );
}

export default VoteSection;