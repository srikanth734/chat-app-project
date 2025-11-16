// mockData.js
// In-memory mock data for sessions and history

const sessions = [
  {
    id: "session-1",
    title: "Intro: React Overview",
    history: [
      {
        question: "What is React?",
        answer: {
          text: "React is a JavaScript library for building user interfaces.",
          table: [
            { Feature: "Type", Value: "Library" },
            { Feature: "Created By", Value: "Facebook (Meta)" },
            { Feature: "Language", Value: "JavaScript" }
          ],
          timestamp: new Date().toISOString()
        }
      }
    ]
  }
];

function generateSessionId() {
  return `session-${Date.now().toString(36)}-${Math.floor(Math.random()*1000)}`;
}

module.exports = { sessions, generateSessionId };
