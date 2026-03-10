import React from "react";


export function parseMentions(text: string): React.ReactNode[] {
  const parts = text.split(/(@\w+)/g);
  return parts.map((part, i) =>
    /^@\w+$/.test(part) ? (
      <span key={i} className="mention">
        {part}
      </span>
    ) : (
      part
    )
  );
}