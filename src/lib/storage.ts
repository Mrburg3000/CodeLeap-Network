import { Post, Comment } from "@/src/types";

const KEYS = {
  username: "codeleap_username",
  posts: "codeleap_posts",
  comments: "codeleap_comments",
};

export function getUsername(): string | null {
  return localStorage.getItem(KEYS.username);
}

export function setUsername(name: string) {
  localStorage.setItem(KEYS.username, name);
}

export function removeUsername() {
  localStorage.removeItem(KEYS.username);
}

export function getPosts(): Post[] {
  const raw = localStorage.getItem(KEYS.posts);
  if (!raw) return [];
  const posts: Post[] = JSON.parse(raw);
  return posts.map((p) => ({ ...p, likes: p.likes ?? [] }));
}

export function savePosts(posts: Post[]) {
  localStorage.setItem(KEYS.posts, JSON.stringify(posts));
}

export function getComments(): Comment[] {
  const raw = localStorage.getItem(KEYS.comments);
  return raw ? JSON.parse(raw) : [];
}

export function saveComments(comments: Comment[]) {
  localStorage.setItem(KEYS.comments, JSON.stringify(comments));
}