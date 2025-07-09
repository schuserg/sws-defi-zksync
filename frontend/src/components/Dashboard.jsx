import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/logs")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.logs || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard load error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading logs…</div>;
  if (!events.length) return <div>No events yet.</div>;

  // Счётчики событий
  const summary = {
    Staked: 0,
    Claimed: 0,
    Withdrawn: 0,
    WithdrawnAll: 0,
  };

  // Данные для графика
  const rewardChartData = [];

  events.forEach((entry) => {
    const type = entry.event;
    if (summary[type] !== undefined) summary[type]++;
    if (type === "Claimed") {
      rewardChartData.push({
        timestamp: entry.timestamp.slice(0, 10), // только дата
        reward: parseFloat(entry.args?.reward || 0),
      });
    }
  });

  return (
    <div style={{ padding: "1rem", maxWidth: "900px", margin: "0 auto" }}>
      <h2>📊 Telegram Activity Feed</h2>

      {/* Сводка событий */}
      <ul>
        <li>🔥 Staked: {summary.Staked}</li>
        <li>💵 Withdrawn: {summary.Withdrawn}</li>
        <li>🎁 Claimed: {summary.Claimed}</li>
        <li>🧹 WithdrawnAll: {summary.WithdrawnAll}</li>
      </ul>

      {/* График наград */}
      <h4>📈 Rewards over time</h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={rewardChartData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="reward"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Все события */}
      <h4 style={{ marginTop: "2em" }}>📂 All Events</h4>
      {events
        .slice()
        .reverse()
        .map((entry, idx) => (
          <div
            key={idx}
            style={{
              background: "#f2f2f2",
              padding: "1em",
              borderRadius: "8px",
              marginBottom: "1em",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              fontFamily: "monospace",
              whiteSpace: "pre-wrap",
            }}
          >
            <div style={{ fontSize: "0.85em", color: "#888" }}>
              {entry.timestamp}
            </div>
            <pre>{JSON.stringify(entry, null, 2)}</pre>
          </div>
        ))}
    </div>
  );
}

