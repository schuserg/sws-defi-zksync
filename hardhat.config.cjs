const { config: dotenv } = require("dotenv");
dotenv();

require("@matterlabs/hardhat-zksync-deploy");
require("@matterlabs/hardhat-zksync-solc");
require("@matterlabs/hardhat-zksync-verify");

/** @type import("hardhat/config").HardhatUserConfig */
const config = {
  zksolc: {
    compilerSource: "binary",
    settings: {
      // Specify path to local zksolc binary
      compilerPath: "./zksolc-linux-amd64-gnu-v1.5.15",
    },
  },
  defaultNetwork: "zkSyncMainnet",
  networks: {
    zkSyncMainnet: {
      url: process.env.ZKSYNC_ERA_MAINNET_RPC || "",
      ethNetwork: process.env.ETH_MAINNET_RPC || "",
      zksync: true,
      // Use key if present, else empty array (avoids CI errors)
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

module.exports = config;

