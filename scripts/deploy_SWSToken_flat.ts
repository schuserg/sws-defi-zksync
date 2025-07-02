// scripts/deploy-swstoken-flat.ts

import { Wallet, Provider, ContractFactory } from "zksync-ethers";
import * as hre from "hardhat";
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

async function main() {
  console.log("🚀 Deploying SWSToken_flat...");

  // Провайдер и кошелёк
  const provider = new Provider(hre.network.config.url as string);
  const wallet = new Wallet(process.env.PRIVATE_KEY!, provider);

  // Загрузка ABI и байткода
  const abiPath = path.resolve(__dirname, "../abi/SWSToken.abi.json");
  const bytecodePath = path.resolve(__dirname, "../abi/SWSToken.bytecode.json");

  const abi = JSON.parse(fs.readFileSync(abiPath, "utf-8"));
  const bytecodeJson = JSON.parse(fs.readFileSync(bytecodePath, "utf-8"));
  const bytecode = bytecodeJson.bytecode;

  // Создание и деплой контракта
  const factory = new ContractFactory(abi, bytecode, wallet);
  const contract = await factory.deploy();

  await contract.waitForDeployment();
  const address = await contract.getAddress();

  console.log(`✅ SWSToken_flat deployed at: ${address}`);

  // Обновляем .env
  const envPath = path.resolve(__dirname, "../.env");
  let env = fs.readFileSync(envPath, "utf-8");
  env = env.replace(/SWSTOKEN_ADDRESS=.*/g, `SWSTOKEN_ADDRESS=${address}`);
  fs.writeFileSync(envPath, env);
  console.log("📦 .env updated with SWSTOKEN_ADDRESS");
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});

