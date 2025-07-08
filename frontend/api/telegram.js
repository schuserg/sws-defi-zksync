// frontend/api/telegram.js
/* eslint-env node */

import fetch from 'node-fetch';

export default async function handler(req, res) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_PUBLIC_CHAT_ID;

  if (!token || !chatId) {
    return res.status(500).json({ error: "Missing TELEGRAM_* env vars" });
  }

  const url = `https://api.telegram.org/bot${token}/getUpdates`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const messages = (data.result || [])
      .filter(m => m.message?.chat?.id === chatId)
      .map(m => ({
        date: new Date(m.message.date * 1000).toLocaleString(),
        text: m.message.text,
      }))
      .slice(-10)
      .reverse();

    res.status(200).json({ messages });
  } catch (err) {
    console.error("Failed to fetch telegram messages:", err);
    res.status(500).json({ error: "Failed to fetch telegram messages" });
  }
}

