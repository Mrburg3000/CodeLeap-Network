"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CreatePostCard from "@/src/components/feed/CreatePostCard";
import PostList from "@/src/components/feed/PostList";
import DeleteModal from "@/src/components/modals/DeleteModal";
import EditModal from "@/src/components/modals/EditModal";
import SortFilterBar, { SortOption, FilterOption } from "@/src/components/feed/SortFilterBar";
import { Post, Comment } from "@/src/types";
import {
  getUsername,
  removeUsername,
  getPosts,
  savePosts,
  getComments,
  saveComments,
} from "@/src/lib/storage";

export default function FeedPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editPost, setEditPost] = useState<Post | null>(null);
  const [sort, setSort] = useState<SortOption>("newest");
  const [filter, setFilter] = useState<FilterOption>("all");

  useEffect(() => {
    const saved = getUsername();
    if (!saved) {
      router.push("/");
      return;
    }
    setUsername(saved);
    setPosts(getPosts());
    setComments(getComments());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updatePosts = (newPosts: Post[]) => {
    setPosts(newPosts);
    savePosts(newPosts);
  };

  const handleCreate = (title: string, content: string, mediaUrl?: string, mediaType?: string) => {
    const newPost: Post = {
      id: Date.now(),
      title,
      content,
      author: username,
      createdAt: new Date().toISOString(),
      likes: [],
      mediaUrl,
      mediaType,
    };
    updatePosts([newPost, ...posts]);
  };

  const handleDelete = (id: number) => {
    updatePosts(posts.filter((p) => p.id !== id));
    setDeleteId(null);
  };

  const handleEdit = (title: string, content: string, mediaUrl?: string, mediaType?: string) => {
    if (!editPost) return;
    updatePosts(
      posts.map((p) =>
        p.id === editPost.id ? { ...p, title, content, mediaUrl, mediaType } : p
      )
    );
    setEditPost(null);
  };

  const handleToggleLike = (postId: number) => {
    updatePosts(
      posts.map((p) => {
        if (p.id !== postId) return p;
        const liked = p.likes.includes(username);
        return {
          ...p,
          likes: liked
            ? p.likes.filter((u) => u !== username)
            : [...p.likes, username],
        };
      })
    );
  };

  const handleAddComment = (postId: number, content: string) => {
    const newComment: Comment = {
      id: Date.now(),
      postId,
      author: username,
      content,
      createdAt: new Date().toISOString(),
    };
    const updated = [...comments, newComment];
    setComments(updated);
    saveComments(updated);
  };

  const handleLogout = () => {
    removeUsername();
    router.push("/");
  };

  const displayedPosts = posts
    .filter((p) => filter === "all" || p.author === username)
    .sort((a, b) => {
      if (sort === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sort === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sort === "most_liked") return b.likes.length - a.likes.length;
      return 0;
    });

  return (
    <div className="page">
      <div className="center-wrapper">
        <header className="header">
          <span className="header-title">CodeLeap Network</span>
          <div className="header-right">
            <span className="header-username">@{username}</span>
            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        <main className="main">
          <CreatePostCard onSubmit={handleCreate} />

          <SortFilterBar
            sort={sort}
            filter={filter}
            onSortChange={setSort}
            onFilterChange={setFilter}
          />

          <PostList
            posts={displayedPosts}
            username={username}
            comments={comments}
            onDelete={setDeleteId}
            onEdit={setEditPost}
            onToggleLike={handleToggleLike}
            onAddComment={handleAddComment}
          />
        </main>
      </div>

      {deleteId && (
        <DeleteModal
          onConfirm={() => handleDelete(deleteId)}
          onCancel={() => setDeleteId(null)}
        />
      )}

      {editPost && (
        <EditModal
          post={editPost}
          onSave={handleEdit}
          onCancel={() => setEditPost(null)}
        />
      )}
    </div>
  );
}