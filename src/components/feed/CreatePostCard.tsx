"use client";

import { useState } from "react";
import MediaUpload from "./MediaUpload";

interface CreatePostCardProps {
  onSubmit: (title: string, content: string, mediaUrl?: string, mediaType?: string) => void;
}

export default function CreatePostCard({ onSubmit }: CreatePostCardProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mediaUrl, setMediaUrl] = useState<string | undefined>();
  const [mediaType, setMediaType] = useState<string | undefined>();

  const canCreate = title.trim() && content.trim();

  const handleCreate = () => {
    if (!canCreate) return;
    onSubmit(title.trim(), content.trim(), mediaUrl, mediaType);
    setTitle("");
    setContent("");
    setMediaUrl(undefined);
    setMediaType(undefined);
  };

  return (
    <div className="card">
      <h2 className="card-title">What's on your mind?</h2>
      <label className="field-label">Title</label>
      <input
        className="field-input"
        placeholder="Hello world"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label className="field-label" style={{ marginTop: 12 }}>Content</label>
      <textarea
        className="field-textarea"
        placeholder="Content here — use @username to mention someone"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
      />
      <div className="card-footer">
        <MediaUpload
          mediaUrl={mediaUrl}
          onSelect={(url, type) => { setMediaUrl(url); setMediaType(type); }}
          onRemove={() => { setMediaUrl(undefined); setMediaType(undefined); }}
        />
        <button
          className={`btn-primary ${!canCreate ? "disabled" : ""}`}
          onClick={handleCreate}
          disabled={!canCreate}
        >
          Create
        </button>
      </div>
    </div>
  );
}