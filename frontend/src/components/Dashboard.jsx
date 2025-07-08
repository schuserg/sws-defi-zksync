import { useEffect, useState } from "react";

export default function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/telegram")
      .then((res) => res.json())
      .then((data) => {
        setMessages(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Telegram load error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading Telegram messages…</div>;
  if (!messages.length) return <div>No messages available.</div>;

  return (
    <div style={{ padding: "1rem", maxWidth: "800px", margin: "0 auto" }}>
      <h2>📊 Telegram Activity Feed</h2>
      {messages.map((msg, idx) => (
        <div
          key={idx}
          style={{
            background: "#f2f2f2",
            padding: "1em",
            borderRadius: "8px",
            marginBottom: "1em",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            fontFamily: "monospace",
          }}
        >
          <div style={{ fontSize: "0.85em", color: "#888" }}>{msg.date}</div>
          <pre style={{ margin: 0 }}>{msg.text}</pre>
        </div>
      ))}
    </div>
  );
}

