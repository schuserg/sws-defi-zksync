// scripts/verify.ts

import { run } from "hardhat";
import * as dotenv from "dotenv";
import args from "./constructor-args";

dotenv.config();

async function main() {
  const address = process.env.SWSSTAKING_ADDRESS;
  if (!address) throw new Error("SWSSTAKING_ADDRESS not found in .env");

  await run("verify:verify", {
    address,
    constructorArguments: args,
  });

  console.log(`✅ Verified SWSStaking at ${address}`);
}

main().catch((error) => {
  console.error("❌ Verification failed:", error);
  process.exit(1);
});

