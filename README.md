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

Set up `.env` file:

```env
ZKSYNC_ERA_MAINNET_RPC=https://zksync-mainnet.g.alchemy.com/v2/YOUR_KEY
ETH_MAINNET_RPC=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
PRIVATE_KEY=your_wallet_private_key
PUBLIC_KEY=your_public_address
SWSTOKEN_ADDRESS=0x...
DOLTOKEN_ADDRESS=0x...
SWSSTAKING_ADDRESS=0x...
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

### ⚙ Hardhat config in ESM

We use `hardhat.config.ts` via `.cjs` proxy (`hardhat.config.cjs`) using `ts-node/register`.

> This allows Hardhat CLI and CI (`npx hardhat compile`) to work inside ESM project with `"type": "module"` in `package.json`.

CI-compatible command (no ts-node CLI flags needed):

```bash
node --loader ts-node/esm node_modules/hardhat/internal/cli/cli.js compile

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

## License

MIT © 2025 SWS DeFi Team

