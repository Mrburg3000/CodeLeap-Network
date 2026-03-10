/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef } from "react";

interface MediaUploadProps {
  mediaUrl?: string;
  onSelect: (base64: string, type: string) => void;
  onRemove: () => void;
}

export default function MediaUpload({ mediaUrl, onSelect, onRemove }: MediaUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;


    if (file.size > 4 * 1024 * 1024) {
      alert("Image must be under 4MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      onSelect(result, file.type);
    };
    reader.readAsDataURL(file);

    e.target.value = "";
  };

  return (
    <div className="media-upload">
      {mediaUrl ? (
        <div className="media-preview">
          <img src={mediaUrl} alt="Attachment preview" className="media-img" />
          <button className="media-remove" onClick={onRemove} title="Remove image">
            ✕
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="media-btn"
          onClick={() => inputRef.current?.click()}
        >
          <ImageIcon />
          <span>Attach image</span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFile}
      />
    </div>
  );
}

function ImageIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}