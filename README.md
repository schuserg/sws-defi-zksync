# SWS DeFi Staking on zkSync Era Mainnet

A complete DeFi staking project deployed on zkSync Era Mainnet. Users can stake SWST tokens and earn DOL reward tokens via the SWSStaking contract. Fully verified, frontend-connected, and ready for use.

---

## Overview

* **Stake Token**: `SWSToken` (SWST)
* **Reward Token**: `DOLToken` (DOL)
* **Staking Contract**: `SWSStaking`
* **Network**: zkSync Era Mainnet

---

## Contract Addresses (Mainnet)

| Contract   | Address                                      |
| ---------- | -------------------------------------------- |
| SWSToken   | `0xF8c34f13DC6C97a31fb73083315D9bF9324661c1` |
| DOLToken   | `0x0C313e774E51d7306cecc657638d2a9eD593B3EE` |
| SWSStaking | `0xc524BB5cB11D0EAfBf809C6300eF78bF8f94A2c9` |

All contracts are fully verified on the [zkSync Era Explorer](https://explorer.zksync.io/).

---

## Features

* ✅ Staking of SWST tokens
* ✅ Earning DOL rewards
* ✅ Minting via staking contract
* ✅ Frontend connected
* ✅ Fully verified flat contracts
* ✅ Optimized for zkSync Era L2

---

## Run the Project Locally

```bash
git clone https://github.com/yourusername/sws-defi-zksync.git
cd sws-defi-zksync
npm install
npx hardhat compile
npm run dev  # or your frontend start script
```

---

## 📄 Environment Variables

This project uses both backend and frontend environment variables.  
Frontend variables must start with `VITE_` to be accessible in React (via `import.meta.env`).

### ✅ Example `.env` file:

```env
# RPC settings
ZKSYNC_ERA_MAINNET_RPC=https://zksync-mainnet.g.alchemy.com/v2/YOUR_KEY
ETH_MAINNET_RPC=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
PRIVATE_KEY=your_private_key
PUBLIC_KEY=0xYourPublicAddress

# Contract addresses
SWSTOKEN_ADDRESS=0x...
DOLTOKEN_ADDRESS=0x...
SWSSTAKING_ADDRESS=0x...

# Frontend & alerts (Vite-compatible)
VITE_TELEGRAM_BOT_TOKEN=your_bot_token
VITE_TELEGRAM_INTERNAL_CHAT_ID=your_internal_chat_id
VITE_TELEGRAM_PUBLIC_CHAT_ID=
DISCORD_WEBHOOK=https://discord.com/api/webhooks/your_webhook_url
```

---

## Scripts

* `deploy_SWSToken_flat.ts` — Deploy SWSToken
* `deploy-doltoken_flat.ts` — Deploy DOLToken
* `deploy-swsstaking_flat.ts` — Deploy SWSStaking
* `verify.ts` — Verify SWSStaking
* `verify-tokens.ts` — Verify SWSToken and DOLToken

---

## 📸 Screenshots

🖼️ UI preview of the dApp in action:

- [Wallet connected](./screenshots/wallet-connected.png)
- [Staking success](./screenshots/staking-success.png)
- [Claiming rewards](./screenshots/claim-rewards.png)
- [Withdrawing tokens](./screenshots/withdraw-tokens.png)
- [Balance preview](./screenshots/balance-preview.png)
- [All reward flows](./screenshots/all-reward-flows.png)
- [Verified contracts](./screenshots/verified-contracts.png)

---

## DApp Access

> 🚀 Optionally add link here if deployed online:

**Live DApp**: [sws-defi-zksync.vercel.app](https://sws-defi-zksync.vercel.app) *(live preview)*

---

## Tech Stack

* Solidity + zkSolc
* Hardhat + TypeScript
* zkSync Era L2
* Ethers.js (frontend integration)
* React + Vite

---

## 🛠️ ✅ Compile & Deploy

```bash
npx hardhat compile --network zkSyncMainnet
npx hardhat run scripts/deploy-swstoken_flat.ts --network zkSyncMainnet
npx hardhat run scripts/deploy-doltoken_flat.ts --network zkSyncMainnet
npx hardhat run scripts/deploy-swsstaking_flat.ts --network zkSyncMainnet
```

---

## 🔐 Contract Verification

All 3 contracts fully verified with:

```bash
npx hardhat run scripts/verify.ts --network zkSyncMainnet         # SWSStaking_flat.sol
npx hardhat run scripts/verify-tokens.ts --network zkSyncMainnet  # SWSToken_flat.sol, DOLToken_flat.sol
```

### 📜 Script Descriptions

* `verify.ts` — verifies `SWSStaking_flat.sol` contract individually
* `verify-tokens.ts` — verifies both `SWSToken_flat.sol` and `DOLToken_flat.sol` contracts

  > ✅ All 3 contracts are flat, optimized, and fully verified on [zkSync Era Explorer](https://explorer.zksync.io/)

---

## 📡 Backend (Listener)

A lightweight Python script (`listener.py`) listens to smart contract events on zkSync Era Mainnet and logs all interactions for monitoring and potential integration.

### 🎯 Features:
- Listens to events from the `SWSStaking` contract:
  - `Staked(address user, uint256 amount)`
  - `Claimed(address user, uint256 reward)`
  - `Withdrawn(address user, uint256 amount)`
- Saves logs to `backend/logs/mint_log.json`
- Can be extended with:
  - Telegram notifications  
  - Analytics dashboard  
  - Grant activity proofs (Layer3, Gitcoin, etc.)

### ▶ How to run:
```bash
cd backend
python listener.py

---

## Future Plans

* 🔄 Add mobile responsiveness
* 🎯 Deploy frontend via Vercel / Netlify
* 💸 Apply to Gitcoin, Layer3, zkSync grants

---

## 👥 Contributors

* Wallet: `0xA606...748b9`
* Built by SWS DeFi Team 2025

---

## 🌐 Network Info

* **zkSync Era Mainnet RPC**: `https://zksync-mainnet.g.alchemy.com/v2/...`
* **Ethereum Mainnet RPC**: `https://eth-mainnet.g.alchemy.com/v2/...`
* Chain ID: `324`

---

## ✅ GitHub Actions CI

This project uses GitHub Actions for continuous integration.

**Workflow:**
- Lint checks  
- Frontend build test (Vite)  
- Hardhat compilation check  

CI workflow file: `.github/workflows/ci.yml`

CI runs automatically on every push or pull request to ensure code integrity and deployment readiness.

---

### ⚙ Hardhat config in CommonJS

We use `hardhat.config.cjs` with CommonJS syntax.

This enables full compatibility with Hardhat CLI and GitHub Actions  
inside an ESM project (`"type": "module"` in `package.json`).

✅ Compatible with both local CLI and CI:

```bash
npx hardhat --config hardhat.config.cjs compile

---

## 🧹 ESLint (Code Quality)

We use **ESLint v9.x** with Flat Config and React + TypeScript rules.

### 📦 Run lint check:

```bash
npm run lint

```

### ✅ Features:
- Based on `@eslint/js` and `eslint-plugin-react`
- Compatible with Flat Config system (ESLint 9+)
- Handles both `.js` / `.ts` and `.jsx` / `.tsx` files
- Auto-detects React version
- Ignores `node_modules`, `dist`, `venv`, etc.

### 📄 Config location:
`eslint.config.js` in root directory

---

## 📲 Telegram Alerts

The backend listener sends real-time alerts to Telegram upon detecting events in the `SWSStaking` contract.

### 🔔 Events Tracked:
- `Staked`
- `Claimed`
- `Withdrawn`
- `WithdrawnAll`

### 📄 How It Works:
- The script uses the `TELEGRAM_BOT_TOKEN` and `TELEGRAM_INTERNAL_CHAT_ID` from `.env`
- Formats and sends structured event messages
- Supports emoji-rich formatting and timestamps

### 🔧 Setup `.env`:
```env
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_INTERNAL_CHAT_ID=your_chat_id
```

> Example output:
```
📬 Claimed:
🧑 User: 0xABC...
💰 Reward: 123.0
🧱 Block: 6257000
🔗 Tx: 0xabc123...
🕒 Time: 2025-07-07T12:34:56Z
```

Telegram bot must be created via [@BotFather](https://t.me/BotFather) and added to your group/channel.

---

📡 Event Listener & Alerts
The project includes an asynchronous event listener (backend/listener.py) that tracks smart contract activity on zkSync Era Mainnet.

⛓ Listens to Staked, Claimed, Withdrawn, WithdrawnAll events

📝 Logs events to logs/mint_log.json

📬 Sends real-time Telegram alerts via bot

🔁 Runs continuously via PM2 (configured to auto-start on reboot)

To run locally:

```bash
cd backend
pm2 start listener.py --interpreter=python3 --name sws-listener
pm2 save
pm2 startup
```

---

## 📊 Analytics Dashboard

The project includes a full-featured analytics dashboard to visualize smart contract activity on zkSync Era Mainnet.

### 🧱 Built With:

* **React + Recharts**: Interactive data visualization
* **Telegram API integration**: Real-time events fetched from a Telegram group/channel
* **Serverless fetch via `/api/telegram.js`**: Compatible with Vercel frontend
* **No backend deployment required** (FastAPI/uvicorn no longer needed)

## 📊 Analytics Dashboard

The project includes a full-featured analytics dashboard to visualize smart contract activity on zkSync Era Mainnet.

### 🧱 Built With:

* **React + Recharts**: Interactive data visualization
* **Local backend (FastAPI)**: Serves real-time event logs from `mint_log.json`
* **No Telegram or serverless API involved**

### 📈 Dashboard Shows:

* Distribution of events: `Staked`, `Claimed`, `Withdrawn`, `WithdrawnAll`
* Claimed rewards over time (if available)
* Real-time event log:

  * User address
  * Event type
  * Token amount
  * Reward
  * Tx hash
  * Timestamp (ISO format)

> ✅ Events are logged via `listener.py`
> ✅ Logs saved into `backend/logs/mint_log.json`
> ✅ Dashboard fetches and visualizes them locally

---

### ✨ Local Access

Dashboard is available at:

**[http://localhost:5173/dashboard](http://localhost:5173/dashboard)**

You can switch between **Home** and **Dashboard** tabs in the UI.

---

### ⚙️ Local Dashboard Setup

To visualize events locally:

```bash
cd backend
uvicorn api:app --reload --port 8000  # API must return logs from backend/logs/mint_log.json
```

Open dashboard:

```bash
http://localhost:5173/dashboard  # frontend
http://localhost:8000/logs       # backend API
```

Ensure `Dashboard.jsx` uses:

```js
fetch("http://localhost:8000/logs")
```

This setup fetches real-time events from your local backend (`mint_log.json`) and renders them in the dashboard. No Telegram or external services are required.

---

🔔 Discord Alerts

In addition to Telegram notifications, the project supports Discord webhook alerts for key events:

- Works via `listener.py` and posts to your selected Discord channel via Webhook
- Supports events: `Staked`, `Claimed`, `Withdrawn`, `WithdrawnAll`
- Sends embedded messages with full context (user, amount, reward, block, tx, timestamp)
- Uses `DISCORD_WEBHOOK` from `.env`

To enable:
1. Open your Discord server settings → **Integrations** → **Webhooks** → **New Webhook**
2. Copy the webhook URL and paste into `.env`:

```env
DISCORD_WEBHOOK=https://discord.com/api/webhooks/....
Run the listener:

```bash
pm2 start backend/listener.py --interpreter=python3 --name sws-listener
```
Example output in Discord:
```
📢 Claimed:
👤 User: 0xABC...
💰 Reward: 123.0
📦 Amount: N/A
🔢 Block: 6250000
🔗 Tx: 0xabc123...
🕒 Time: 2025-07-07T12:34:56Z

---

## 🧪 Python Backend Tests

This project uses **GitHub Actions** to run automated tests on each push or pull request.
The tests are written using `unittest` and run with `pytest`.

**Features:**
- Tests the `format_amount()` utility used in the backend.
- Ensures backend logic is robust before deployment.
- CI pipeline installs `fastapi`, `web3`, `python-telegram-bot`, and more.

Run locally:

```bash
cd backend
pytest tests
```

---

## License

MIT © 2025 SWS DeFi Team

