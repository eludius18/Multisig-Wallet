import { deployments, ethers, waffle } from "hardhat";
import { Signer } from "ethers";
import { MultiSig, TokenERC20 } from "../typechain-types/contracts";
import { Deployment } from "hardhat-deploy/dist/types";
import { assert } from "chai";


describe("MultiSig Test", async function () {
    let accounts: Signer[];
    let multiSigDeployment: Deployment;
    let multiSigContract: MultiSig;
    let tokenDeployment: Deployment;
    let tokenContract: TokenERC20;
    let owner: Signer;
    let alice: Signer;
    let bob: Signer;

    before(async function () {
      accounts = await ethers.getSigners();
      owner = accounts[0];
      alice = accounts[1];
      bob = accounts[2];
      multiSigDeployment = await deployments.get("MultiSig");
      multiSigContract = await ethers.getContractAt(
        "MultiSig",
        multiSigDeployment.address
      );
      tokenDeployment = await deployments.get("TokenERC20");
      tokenContract = await ethers.getContractAt(
        "TokenERC20",
        tokenDeployment.address
      );
    });

    describe("MultiSig Contract", () => {
      it.only("should submit a transaction", async () => {
        const destination = alice.getAddress();
        const value = ethers.utils.parseEther("1");
        const data = "0x";
    
        await multiSigContract.connect(owner).submitTransaction(destination, value, data);
        const transactionCount = await multiSigContract.transactionCount();
    
        assert.equal(Number(transactionCount), 1, "transactionCount should be 1");      
      });
    
      it("should confirm a transaction", async () => {
        await multiSigContract.connect(alice).confirmTransaction(0);
        const confirmationsCount = await multiSigContract.getConfirmationsCount(0);
    
        assert.equal(confirmationsCount.toString(), "1", "transactionCount should be 1");      
      });
    
      it("should execute a transaction", async () => {
        await multiSigContract.connect(bob).executeTransaction(0);
        const executed = await multiSigContract.isConfirmed(0);
    
        assert.equal(executed, true, "transaction should be executed");
      });
    });
    
    describe("TokenERC20 Contract", () => {
      it("should transfer tokens", async () => {
        const amount = ethers.utils.parseEther("10");
        await tokenContract.connect(owner).transfer(alice, amount);
    
        const balance = await tokenContract.balanceOf(alice);
        assert.equal(balance.toString(), amount.toString(), "balance should match the transferred amount");
      });
    });
});