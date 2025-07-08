import { useEffect, useState } from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer
} from "recharts";

export default function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = import.meta.env.PROD
    ? "https://your-backend.vercel.app/logs"  
    : "/logs"; 

  useEffect(() => {
    fetch(backendUrl)
      .then((res) => res.json())
      .then((data) => {
        setLogs(data.logs);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load logs:", error);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!logs || logs.length === 0) return <div>No log data available.</div>;

  const countByType = logs.reduce((acc, log) => {
    const key = log.event;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const sumRewardOverTime = logs
    .filter((log) => log.event === "claimed")
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
    <div>
      <h2>📊 SWS Analytics Dashboard</h2>

      <h3>Event Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={Object.entries(countByType).map(([key, value]) => ({ name: key, count: value }))}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Bar dataKey="count" fill="mediumpurple" />
        </BarChart>
      </ResponsiveContainer>

      <h3>Total Rewards Claimed Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={sumRewardOverTime}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="reward" stroke="mediumseagreen" />
        </LineChart>
      </ResponsiveContainer>

      <h3>📑 Latest Logs</h3>
      <ul>
        {logs.slice().reverse().map((log, index) => (
          <li key={index}>
            <p>🍀 <strong>Event:</strong> {log.event}</p>
            <p>👤 <strong>User:</strong> {log.args?.user}</p>
            {log.args?.reward && <p>🏆 <strong>Reward:</strong> {parseFloat(log.args.reward)}</p>}
            <p>🔗 <strong>Tx:</strong> {log.txHash}</p>
            <p>📅 <strong>Time:</strong> {log.timestamp}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

