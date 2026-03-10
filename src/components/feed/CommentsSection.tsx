"use client";

import { useState } from "react";
import { Comment } from "@/src/types";
import { timeAgo } from "@/src/lib/timeAgo";
import { parseMentions } from "@/src/lib/mentions";

interface CommentsSectionProps {
  postId: number;
  comments: Comment[];
  username: string;
  onAddComment: (postId: number, content: string) => void;
}

export default function CommentsSection({
  postId,
  comments,
  username,
  onAddComment,
}: CommentsSectionProps) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const postComments = comments.filter((c) => c.postId === postId);

  const handleSubmit = () => {
    if (!text.trim()) return;
    onAddComment(postId, text.trim());
    setText("");
  };

  return (
    <div className="comments-section">
      <button
        className="comments-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <CommentIcon />
        <span>{postComments.length} {postComments.length === 1 ? "comment" : "comments"}</span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div className="comments-body">
          {postComments.length === 0 && (
            <p className="comments-empty">No comments yet. Be the first!</p>
          )}
          {postComments.map((c) => (
            <div key={c.id} className="comment">
              <span className="comment-author">@{c.author}</span>
              <span className="comment-time">{timeAgo(c.createdAt)}</span>
              <p className="comment-content">{parseMentions(c.content)}</p>
            </div>
          ))}

          <div className="comment-input-row">
            <input
              className="field-input"
              placeholder="Write a comment... use @username to mention"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            <button
              className={`btn-primary ${!text.trim() ? "disabled" : ""}`}
              onClick={handleSubmit}
              disabled={!text.trim()}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function CommentIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}