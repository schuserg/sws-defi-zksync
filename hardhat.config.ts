import { HardhatUserConfig } from "hardhat/types";
import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";
import "@matterlabs/hardhat-zksync-verify";
import "./scripts/verify-tokens";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  zksolc: {
    compilerSource: "binary",
    settings: {
      // Укажи путь до локального бинарника zksolc (у тебя он лежит в корне)
      compilerPath: "./zksolc-linux-amd64-gnu-v1.5.15",
    },
  },
  defaultNetwork: "zkSyncMainnet",
  networks: {
    zkSyncMainnet: {
      url: process.env.ZKSYNC_ERA_MAINNET_RPC || "",
      ethNetwork: process.env.ETH_MAINNET_RPC || "",
      zksync: true,
      // 🛠 Use key if present, else empty array (avoids CI errors)
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
  solidity: {
    version: "0.8.20",
  },
  paths: {
    sources: "./contracts",
    artifacts: "./artifacts-zk",
  },
};

export default config;

