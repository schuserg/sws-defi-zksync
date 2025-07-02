// scripts/setOwnership.ts
import { Wallet, Provider, Contract } from "zksync-ethers";
import * as dotenv from "dotenv";
import deployed from "../frontend/src/deployed_addresses.json";
import DOLToken from "../artifacts-zk/contracts/DOLToken_flat.sol/DOLToken.json";

dotenv.config();

const provider = new Provider(process.env.ZKSYNC_ERA_MAINNET_RPC!);
const wallet = new Wallet(process.env.PRIVATE_KEY!, provider);

async function main() {
  console.log("🔁 Transferring ownership of DOLToken to SWSStaking...");
  const dol = new Contract(deployed.DOLTOKEN_ADDRESS, DOLToken.abi, wallet);
  const tx = await dol.transferOwnership(deployed.SWSSTAKING_ADDRESS);
  await tx.wait();

  console.log(`✅ Ownership of DOLToken transferred to ${deployed.SWSSTAKING_ADDRESS}`);
}

main().catch((err) => {
  console.error("❌ Ownership transfer failed:", err);
  process.exit(1);
});

