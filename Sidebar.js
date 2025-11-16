import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const [sessions, setSessions] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  async function fetchSessions() {
    try {
      const res = await fetch("http://localhost:4000/api/sessions");
      const data = await res.json();
      setSessions(data);
    } catch (err) {
      console.error("Failed to load sessions", err);
    }
  }

  useEffect(() => {
    fetchSessions();
    // poll/update when returning to sidebar (simple)
    const id = setInterval(fetchSessions, 5000);
    return () => clearInterval(id);
  }, []);

  const handleNewChat = async () => {
    const res = await fetch("http://localhost:4000/api/new-chat");
    const data = await res.json();
    // navigate to new chat (use location change)
    window.location.href = `/chat/${data.sessionId}`;
  };

  return (
    <aside className={`flex-shrink-0 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 ${collapsed ? "w-16" : "w-72"} transition-width duration-150`}>
      <div className="h-full flex flex-col">
        <div className="p-3 flex items-center justify-between">
          {!collapsed && <div className="font-semibold">Sessions</div>}
          <div className="flex items-center gap-2">
            <button onClick={() => setCollapsed(!collapsed)} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
              {collapsed ? "→" : "←"}
            </button>
          </div>
        </div>

        <div className="p-3">
          <button onClick={handleNewChat} className="w-full bg-blue-600 text-white p-2 rounded">
            {collapsed ? "+" : "New Chat"}
          </button>
        </div>

        <div className="flex-1 overflow-auto p-2">
          {sessions.length === 0 && <div className="text-sm text-gray-500">No sessions</div>}

          {sessions.map(s => (
            <Link key={s.id} to={`/chat/${s.id}`} className={`block p-2 my-1 rounded ${location.pathname.includes(s.id) ? "bg-blue-100 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
              <div className="text-sm truncate">{s.title}</div>
              {!collapsed && <div className="text-xs text-gray-500">{s.id}</div>}
            </Link>
          ))}
        </div>

        <div className="p-3 border-t border-gray-200 dark:border-gray-700">
          {!collapsed ? (
            <div>
              <div className="text-sm">User</div>
              <div className="text-xs text-gray-500">Guest</div>
            </div>
          ) : (
            <div className="text-center text-xs">G</div>
          )}
        </div>
      </div>
    </aside>
  );
}
