// scripts/deploy-swsstaking-flat.ts

import { Wallet, Provider, ContractFactory } from "zksync-ethers";
import * as hre from "hardhat";
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

async function main() {
  console.log("🚀 Deploying SWSStaking_flat...");

  // Провайдер и кошелёк
  const provider = new Provider(hre.network.config.url as string);
  const wallet = new Wallet(process.env.PRIVATE_KEY!, provider);

  // Загрузка ABI и байткода
  const abiPath = path.resolve(__dirname, "../abi/SWSStaking.abi.json");
  const bytecodePath = path.resolve(__dirname, "../abi/SWSStaking.bytecode.json");

  const abi = JSON.parse(fs.readFileSync(abiPath, "utf-8"));
  const bytecodeJson = JSON.parse(fs.readFileSync(bytecodePath, "utf-8"));
  const bytecode = bytecodeJson.bytecode;

  // Аргументы конструктора
  const stakeToken = process.env.SWSTOKEN_ADDRESS!;
  const rewardToken = process.env.DOLTOKEN_ADDRESS!;
  const owner = process.env.PUBLIC_KEY!;

  // Деплой
  const factory = new ContractFactory(abi, bytecode, wallet);
  const contract = await factory.deploy(stakeToken, rewardToken, owner);

  await contract.waitForDeployment();
  const address = await contract.getAddress();

  console.log(`✅ SWSStaking_flat deployed at: ${address}`);

  // Обновление .env
  const envPath = path.resolve(__dirname, "../.env");
  let env = fs.readFileSync(envPath, "utf-8");
  env = env.replace(/SWSSTAKING_ADDRESS=.*/g, `SWSSTAKING_ADDRESS=${address}`);
  fs.writeFileSync(envPath, env);
  console.log("📦 .env updated with SWSSTAKING_ADDRESS");
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});

