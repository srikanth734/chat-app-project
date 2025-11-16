// server.js
const express = require("express");
const cors = require("cors");
const { sessions, generateSessionId } = require("./mockData");

const app = express();
app.use(cors());
app.use(express.json());

// GET /api/sessions -> list sessions (id + title)
app.get("/api/sessions", (req, res) => {
  const list = sessions.map(s => ({ id: s.id, title: s.title }));
  res.json(list);
});

// GET /api/new-chat -> create new session and return id
app.get("/api/new-chat", (req, res) => {
  const newId = generateSessionId();
  sessions.unshift({
    id: newId,
    title: `Chat ${newId}`,
    history: []
  });
  res.json({ sessionId: newId });
});

// GET /api/session/:id -> get history for session
app.get("/api/session/:id", (req, res) => {
  const id = req.params.id;
  const session = sessions.find(s => s.id === id);
  if (!session) return res.status(404).json({ error: "Session not found" });
  res.json(session);
});

// POST /api/chat/:id -> post question, mock answer, append to session history
app.post("/api/chat/:id", (req, res) => {
  const id = req.params.id;
  const { question } = req.body;
  const session = sessions.find(s => s.id === id);
  if (!session) return res.status(404).json({ error: "Session not found" });

  // Very simple mock "structured" answer - you can make it smarter later
  const answer = {
    text: `Mock answer for: "${question}". Below is structured data.`,
    table: [
      { Key: "Requested", Value: question },
      { Key: "ResultCount", Value: Math.floor(Math.random() * 100).toString() },
      { Key: "Status", Value: "OK" }
    ],
    timestamp: new Date().toISOString()
  };

  session.history.push({ question, answer });
  res.json(answer);
});

// Optional: rename a session (simple endpoint)
app.post("/api/session/:id/rename", (req, res) => {
  const id = req.params.id;
  const { title } = req.body;
  const session = sessions.find(s => s.id === id);
  if (!session) return res.status(404).json({ error: "Session not found" });
  session.title = title || session.title;
  res.json({ success: true, session });
});

// start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend listening on http://localhost:${PORT}`));
