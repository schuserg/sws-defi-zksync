import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/logs")
      .then((res) => res.json())
      .then((data) => {
        setLogs(data.logs);
        setLoading(false);
      });
  }, []);

  const countByType = logs.reduce((acc, log) => {
    const key = log.event;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const sumRewardOverTime = logs
    .filter((log) => log.event === "Claimed")
    .map((log) => ({
      time: log.timestamp.split("T")[0],
      reward: parseFloat(log.args.reward || 0),
    }))
    .reduce((acc, item) => {
      const found = acc.find((i) => i.time === item.time);
      if (found) {
        found.reward += item.reward;
      } else {
        acc.push({ ...item });
      }
      return acc;
    }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 SWS Analytics Dashboard</h2>

      <h3>Event Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={Object.entries(countByType).map(([key, value]) => ({ name: key, count: value }))}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <h3 style={{ marginTop: 40 }}>Total Rewards Claimed Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={sumRewardOverTime}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Line type="monotone" dataKey="reward" stroke="#82ca9d" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>

      <h3 style={{ marginTop: 40 }}>📄 Latest Logs</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        logs
          .slice()
          .reverse()
          .map((log, index) => (
            <div key={index} style={{ borderTop: "1px solid #999", marginTop: 20, paddingTop: 10 }}>
              <p>🍀 <strong>Event:</strong> {log.event}</p>
              <p>👤 <strong>User:</strong> {log.args.user}</p>
              {log.args.amount && <p>💰 <strong>Amount:</strong> {log.args.amount}</p>}
              {log.args.reward && <p>🏆 <strong>Reward:</strong> {log.args.reward}</p>}
              <p>🔗 <strong>Tx:</strong> {log.txHash}</p>
              <p>📅 <strong>Time:</strong> {log.timestamp}</p>
            </div>
          ))
      )}
    </div>
  );
}

