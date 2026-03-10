import PostCard from "./PostCard";
import { Post, Comment } from "@/src/types";

interface PostListProps {
  posts: Post[];
  username: string;
  comments: Comment[];
  onDelete: (id: number) => void;
  onEdit: (post: Post) => void;
  onToggleLike: (postId: number) => void;
  onAddComment: (postId: number, content: string) => void;
}

export default function PostList({
  posts,
  username,
  comments,
  onDelete,
  onEdit,
  onToggleLike,
  onAddComment,
}: PostListProps) {
  return (
    <>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          isOwner={post.author === username}
          username={username}
          comments={comments}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggleLike={onToggleLike}
          onAddComment={onAddComment}
        />
      ))}
    </>
  );
}