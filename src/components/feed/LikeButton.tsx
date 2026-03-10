"use client";

interface LikeButtonProps {
  likes: string[];
  username: string;
  onToggle: () => void;
}

export default function LikeButton({ likes, username, onToggle }: LikeButtonProps) {
  const liked = likes.includes(username);

  return (
    <button
      className={`like-btn ${liked ? "liked" : ""}`}
      onClick={onToggle}
      title={liked ? "Unlike" : "Like"}
      aria-label={liked ? "Unlike post" : "Like post"}
    >
      <HeartIcon filled={liked} />
      <span className="like-count">{likes.length}</span>
    </button>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="heart-icon"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}