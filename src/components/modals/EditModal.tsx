"use client";

import { useState } from "react";
import { Post } from "@/src/types";
import MediaUpload from "@/src/components/feed/MediaUpload";

interface EditModalProps {
  post: Post;
  onSave: (title: string, content: string, mediaUrl?: string, mediaType?: string) => void;
  onCancel: () => void;
}

export default function EditModal({ post, onSave, onCancel }: EditModalProps) {
  const [editTitle, setEditTitle] = useState(post.title);
  const [editContent, setEditContent] = useState(post.content);
  const [mediaUrl, setMediaUrl] = useState<string | undefined>(post.mediaUrl);
  const [mediaType, setMediaType] = useState<string | undefined>(post.mediaType);

  const canSave = editTitle.trim() && editContent.trim();

  const handleSave = () => {
    if (!canSave) return;
    onSave(editTitle.trim(), editContent.trim(), mediaUrl, mediaType);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3 className="modal-title">Edit item</h3>
        <label className="field-label">Title</label>
        <input
          className="field-input"
          placeholder="Hello world"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <label className="field-label" style={{ marginTop: 12 }}>Content</label>
        <textarea
          className="field-textarea"
          placeholder="Content here"
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          rows={4}
        />
        <MediaUpload
          mediaUrl={mediaUrl}
          onSelect={(url, type) => { setMediaUrl(url); setMediaType(type); }}
          onRemove={() => { setMediaUrl(undefined); setMediaType(undefined); }}
        />
        <div className="modal-footer">
          <button className="btn-outline" onClick={onCancel}>Cancel</button>
          <button
            className={`btn-primary ${!canSave ? "disabled" : ""}`}
            onClick={handleSave}
            disabled={!canSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}