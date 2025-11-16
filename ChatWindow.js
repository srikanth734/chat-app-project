import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatInput from "./ChatInput";
import TableResponse from "./TableResponse";
import AnswerFeedback from "./AnswerFeedback";

export default function ChatWindow() {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadSession() {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:4000/api/session/${sessionId}`);
      if (!res.ok) throw new Error("Failed to fetch session");
      const data = await res.json();
      setSession(data);
    } catch (err) {
      setSession(null);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!sessionId) return;
    loadSession();
    // eslint-disable-next-line
  }, [sessionId]);

  const handleSend = async (question) => {
    try {
      const res = await fetch(`http://localhost:4000/api/chat/${sessionId}`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ question })
      });
      const answer = await res.json();
      // append locally
      setSession(prev => ({
        ...prev,
        history: [...(prev?.history || []), { question, answer }]
      }));
    } catch (err) {
      console.error("Send failed", err);
    }
  };

  if (!sessionId) return <div className="p-6">No session selected</div>;
  if (loading) return <div className="p-6">Loading...</div>;
  if (!session) return <div className="p-6">Session not found</div>;

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="text-sm text-gray-600 dark:text-gray-300">{session.title}</div>
        <div className="text-xs text-gray-500">{session.id}</div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-6">
        {session.history?.length === 0 && (
          <div className="text-sm text-gray-500">No messages yet — ask something!</div>
        )}

        {session.history?.map((item, idx) => (
          <div key={idx} className="space-y-2">
            <div className="text-sm font-medium">Q: {item.question}</div>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
              <div className="text-sm">{item.answer.text}</div>
              <TableResponse table={item.answer.table} />
              <AnswerFeedback />
            </div>
            <div className="text-xs text-gray-400">{item.answer.timestamp || ""}</div>
          </div>
        ))}
      </div>

      <ChatInput onSend={handleSend} />
    </div>
  );
}
