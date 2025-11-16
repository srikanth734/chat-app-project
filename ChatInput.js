import React, { useState } from "react";

export default function ChatInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await onSend(text.trim());
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
        />
        <button className="bg-blue-600 text-white px-4 rounded" type="submit">Send</button>
      </div>
    </form>
  );
}
