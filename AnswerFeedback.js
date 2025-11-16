import React, { useState } from "react";

export default function AnswerFeedback() {
  const [state, setState] = useState(null); // 'like' | 'dislike' | null

  return (
    <div className="flex gap-2 mt-2">
      <button
        className={`p-2 rounded border ${state === "like" ? "bg-green-100" : ""}`}
        onClick={() => setState(state === "like" ? null : "like")}
        aria-label="like"
      >
        👍
      </button>
      <button
        className={`p-2 rounded border ${state === "dislike" ? "bg-red-100" : ""}`}
        onClick={() => setState(state === "dislike" ? null : "dislike")}
        aria-label="dislike"
      >
        👎
      </button>
    </div>
  );
}
