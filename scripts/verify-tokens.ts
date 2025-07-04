// scripts/verify-tokens.ts
import * as dotenv from "dotenv";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { task } from "hardhat/config";

dotenv.config();

task("verify-swstoken", "Verify SWSToken_flat.sol")
  .setAction(async (_, hre: HardhatRuntimeEnvironment) => {
    await hre.run("verify:verify", {
      address: process.env.SWSTOKEN_ADDRESS,
      contract: "contracts/SWSToken_flat.sol:SWSToken",
      constructorArguments: [],
    });
  });

task("verify-doltoken", "Verify DOLToken_flat.sol")
  .setAction(async (_, hre: HardhatRuntimeEnvironment) => {
    await hre.run("verify:verify", {
      address: process.env.DOLTOKEN_ADDRESS,
      contract: "contracts/DOLToken_flat.sol:DOLToken",
      constructorArguments: [],
    });
  });

