// scripts/deploy-swsstaking.ts
import { Wallet, Provider } from "zksync-ethers";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import * as hre from "hardhat";
import * as dotenv from "dotenv";
import fs from "fs";

dotenv.config();

async function main() {
    // Connect to zkSync Era Mainnet provider
    const provider = new Provider(process.env.ZKSYNC_ERA_MAINNET_RPC!);

    // Prepare wallet using private key
    const wallet = new Wallet("0x" + process.env.PRIVATE_KEY!, provider);

    // Create Hardhat Deployer instance
    const deployer = new Deployer(hre, wallet);

    // Load compiled contract artifact
    const artifact = await deployer.loadArtifact("SWSStaking");

    // Deploy the contract with constructor arguments:
    // constructor(address _stakeToken, address _rewardToken, address initialOwner)
    const contract = await deployer.deploy(artifact, [
        process.env.SWSTOKEN_ADDRESS,
        process.env.DOLTOKEN_ADDRESS,
        process.env.PUBLIC_KEY,
    ]);

    // Get deployed address
    const contractAddress = await contract.getAddress();
    console.log(`✅ SWSStaking deployed at: ${contractAddress}`);

    // Update .env with SWSSTAKING_ADDRESS
    const envPath = ".env";
    const envContent = fs.readFileSync(envPath, "utf8");
    const updatedEnv = envContent.replace(
        /SWSSTAKING_ADDRESS=.*/g,
        `SWSSTAKING_ADDRESS=${contractAddress}`
    );
    fs.writeFileSync(envPath, updatedEnv);
    console.log("✅ Updated .env with SWSSTAKING_ADDRESS");
}

main().catch((err) => {
    console.error("❌ Deployment failed:", err);
    process.exit(1);
});

