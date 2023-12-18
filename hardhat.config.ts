import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-deploy";
import "hardhat-contract-sizer";
import "solidity-docgen";

dotenv.config();

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.18",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.7.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.5.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      }
    ]
  },
  namedAccounts: {
    deployer: 0
  },
  networks: {
    hardhat: {
      mining: {
        auto: true,
        interval: [2500, 3000],
        mempool: {
          order: "fifo"
        }
      }
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    /*mumbai: {
      url: process.env.MUMBAI_RPC_URL,
      chainId: 80001,
      accounts: [`0x${process.env.DEPLOYER_PRIVATE_KEY1}`],
    },
     goerli: {
      url: process.env.RPC_URL,
      chainId: 5,
      accounts: [`0x${process.env.DEPLOYER_PRIVATE_KEY1}`],
    },
    bscTestnet: {
      url: process.env.BSC_TESTNET_URL,
      chainId: 97,
      gas: 2100000,
      gasPrice: 12000000000,
      accounts: [`0x${process.env.DEPLOYER_PRIVATE_KEY1}`],
    },
    bscMainnet: {
      url: `https://bsc-dataseed.binance.org/`,
      chainId: 56,
      gas: 2100000,
      gasPrice: 5500000000,
      accounts: [`0x${process.env.DEPLOYER_PRIVATE_KEY1}`],
    }, */
  },
};

export default config;