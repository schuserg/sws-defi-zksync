// scripts/mintSWST.ts
import { Wallet, Provider } from "zksync-ethers";
import { ethers } from "ethers";
import * as dotenv from "dotenv";
import deployed from "../frontend/src/deployed_addresses.json";
import SWSToken from "../artifacts-zk/contracts/SWSToken_flat.sol/SWSToken.json";

dotenv.config();

const provider = new Provider(process.env.ZKSYNC_ERA_MAINNET_RPC!);
const wallet = new Wallet(process.env.PRIVATE_KEY!, provider);

async function main() {
  const sws = new ethers.Contract(deployed.SWSTOKEN_ADDRESS, SWSToken.abi, wallet);

  const amount = ethers.parseEther("1000000"); // 1,000,000 SWST
  const tx = await sws.mint(wallet.address, amount);
  await tx.wait();

  console.log(`✅ Minted 1,000,000 SWST to ${wallet.address}`);
}

main();

