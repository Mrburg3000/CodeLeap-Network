/* eslint-disable @next/next/no-img-element */
"use client";

import TrashIcon from "./icons/TrashIcon";
import EditIcon from "./icons/EditIcon";
import LikeButton from "./LikeButton";
import CommentsSection from "./CommentsSection";
import { Post, Comment } from "@/src/types";
import { timeAgo } from "@/src/lib/timeAgo";
import { parseMentions } from "@/src/lib/mentions";

interface PostCardProps {
  post: Post;
  isOwner: boolean;
  username: string;
  comments: Comment[];
  onDelete: (id: number) => void;
  onEdit: (post: Post) => void;
  onToggleLike: (postId: number) => void;
  onAddComment: (postId: number, content: string) => void;
}

export default function PostCard({
  post,
  isOwner,
  username,
  comments,
  onDelete,
  onEdit,
  onToggleLike,
  onAddComment,
}: PostCardProps) {
  return (
    <div className="post-card">
      <div className="post-card-inner">
        <div className="post-header">
          <span className="post-title">{post.title}</span>
          {isOwner && (
            <div className="post-actions">
              <button className="icon-btn" onClick={() => onDelete(post.id)} title="Delete">
                <TrashIcon />
              </button>
              <button className="icon-btn" onClick={() => onEdit(post)} title="Edit">
                <EditIcon />
              </button>
            </div>
          )}
        </div>

        <div className="post-body">
          <div className="post-meta">
            <span className="post-author">@{post.author}</span>
            <span className="post-time">{timeAgo(post.createdAt)}</span>
          </div>
          <p className="post-content">{parseMentions(post.content)}</p>
          {post.mediaUrl && (
            <div className="post-media">
              <img src={post.mediaUrl} alt="Post attachment" className="post-media-img" />
            </div>
          )}
        </div>

        <div className="post-footer">
          <LikeButton
            likes={post.likes}
            username={username}
            onToggle={() => onToggleLike(post.id)}
          />
          <CommentsSection
            postId={post.id}
            comments={comments}
            username={username}
            onAddComment={onAddComment}
          />
        </div>
      </div>
    </div>
  );
}

export type { Post };