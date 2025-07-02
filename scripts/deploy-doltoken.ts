// scripts/deploy-doltoken.ts
import { Wallet, Provider } from "zksync-ethers";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import * as hre from "hardhat";
import * as dotenv from "dotenv";
import fs from "fs";

dotenv.config();

async function main() {
    // Connect to zkSync Era Mainnet provider
    const provider = new Provider(process.env.ZKSYNC_ERA_MAINNET_RPC!);

    // Prepare wallet
    const wallet = new Wallet("0x" + process.env.PRIVATE_KEY!, provider);

    // Create deployer instance
    const deployer = new Deployer(hre, wallet);

    // Load artifact
    const artifact = await deployer.loadArtifact("DOLToken");

    // Deploy contract (no constructor args)
    const contract = await deployer.deploy(artifact);
    const contractAddress = await contract.getAddress();

    console.log(`✅ DOLToken deployed at: ${contractAddress}`);

    // Update .env with new address
    const envPath = ".env";
    const envContent = fs.readFileSync(envPath, "utf8");
    const updatedEnv = envContent.replace(
        /DOLTOKEN_ADDRESS=.*/g,
        `DOLTOKEN_ADDRESS=${contractAddress}`
    );
    fs.writeFileSync(envPath, updatedEnv);
    console.log("✅ Updated .env with DOLTOKEN_ADDRESS");
}

main().catch((err) => {
    console.error("❌ Deployment failed:", err);
    process.exit(1);
});

