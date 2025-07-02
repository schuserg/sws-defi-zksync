// scripts/verify.ts
import { Wallet, Provider } from "zksync-ethers";
import * as dotenv from "dotenv";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { task } from "hardhat/config";

dotenv.config();

const provider = new Provider(process.env.ZKSYNC_ERA_MAINNET_RPC!);
const wallet = new Wallet(process.env.PRIVATE_KEY!, provider);

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


