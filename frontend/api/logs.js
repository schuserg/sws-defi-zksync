import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const logFilePath = path.join(process.cwd(), 'backend', 'logs', 'mint_log.json');

  try {
    const fileContents = fs.readFileSync(logFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    res.status(200).json({ logs: data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to read logs', detail: error.message });
  }
}

