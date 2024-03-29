import { ethers, run } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const signers = await ethers.getSigners();

  const alice = signers[0];
  const bob = signers[1];

  const owners = [alice.address, bob.address];

  const confirmations = 2; // Adjust as needed


  const multisigContract = await deploy("MultiSig", {
    from: deployer,
    log: true,
    proxy: {
      proxyContract: "OpenZeppelinTransparentProxy",
      execute: {
        init: {
          methodName: "initialize",
          args: [
            owners,
            confirmations
          ],
        },
      },
    },
    waitConfirmations: 10,
  });

  console.log("MultiSig deployed at: ", multisigContract.address);
  await delay(5000);
  const multisigImpl = await deployments.get("MultiSig_Implementation");
  
  /* await run("verify:verify", {
    address: multisigContract.address,
    contract: "contracts/MultiSig.sol:MultiSig",
  }); */
  
};

deploy.tags = ["MultiSig"];
export default deploy;