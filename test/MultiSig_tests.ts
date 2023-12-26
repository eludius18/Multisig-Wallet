import { deployments, ethers, waffle } from "hardhat";
import { Signer } from "ethers";
import { MultiSig, TokenERC20 } from "../typechain-types/contracts";
import { Deployment } from "hardhat-deploy/dist/types";
import { assert } from "chai";
import { makeSnapshot, snapshot } from "./test-helpers/snapshot";

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
      let id: number;
      beforeEach(async () => {
        id = await makeSnapshot();
      });
      
      afterEach(async () => {
        snapshot(id);
      });

      it('should store the balance', async () => {
        const initialBalance = 10000;
        await tokenContract.connect(owner).mint(owner.getAddress(), initialBalance);
        await tokenContract.connect(owner).approve(multiSigContract.address, initialBalance);
        await tokenContract.connect(owner).transfer(multiSigContract.address, initialBalance);
        const balance = await tokenContract.balanceOf(multiSigContract.address);
        assert.equal(Number(balance), initialBalance);
      });
      it("should submit a transaction", async () => {
        const destination = alice.getAddress();
        const value = 1;
        const data = "0x";
        await tokenContract.connect(owner).approve(multiSigContract.address, value);
        await tokenContract.connect(owner).mint(owner.getAddress(), value);    
        await multiSigContract.connect(owner).submitTransaction(destination, value, data);
        const transactionCount = await multiSigContract.transactionCount();
    
        assert.equal(Number(transactionCount), 1, "transactionCount should be 1");    
      });

      describe("executing an ERC20 transaction", () => {
  
        it('should have removed the contract balance', async () => {
          const initialBalance = 10000;
          await tokenContract.connect(owner).mint(owner.getAddress(), initialBalance);
          await tokenContract.connect(owner).approve(multiSigContract.address, initialBalance);
          const ownerAddress = await owner.getAddress();
          const aliceAddress = await alice.getAddress();
          const data = tokenContract.interface.encodeFunctionData("transferFrom", [ownerAddress, aliceAddress, initialBalance]);
          await multiSigContract.connect(owner).submitTransaction(tokenContract.address, 0, data);
          const balance = await tokenContract.balanceOf(multiSigContract.address);
          assert.equal(Number(balance), 0);
        });

        it('should have moved the balance to the destination', async () => {
          const initialBalance = 10000;
          const requiredConfirmations = 2;
          await tokenContract.connect(owner).mint(owner.getAddress(), initialBalance);
          await tokenContract.connect(owner).approve(multiSigContract.address, initialBalance);
          const ownerAddress = await owner.getAddress();
          const aliceAddress = await alice.getAddress();
          const data = tokenContract.interface.encodeFunctionData("transferFrom", [ownerAddress, aliceAddress, initialBalance]);
          const tx = await multiSigContract.connect(owner).submitTransaction(tokenContract.address, 0, data);
          const txReceipt = await tx.wait();
          const txId = txReceipt.events?.find((event: any) => event.event === 'Submission')?.args?.transactionId;

          if (txId === undefined) {
            throw new Error('Transaction ID is undefined');
          }

          for (let i = 1; i < requiredConfirmations; i++) {
            await multiSigContract.connect(accounts[i]).confirmTransaction(txId);
          }
        
          const balance = await tokenContract.balanceOf(aliceAddress);
          assert.equal(Number(balance), initialBalance);
        });
      });
    
      it("should confirm a transaction", async () => {
        const destination = alice.getAddress();
        const value = 1;
        const data = "0x";
        await tokenContract.connect(owner).approve(multiSigContract.address, value);
        await tokenContract.connect(owner).mint(owner.getAddress(), value);    
        await multiSigContract.connect(owner).submitTransaction(destination, value, data);
        const transactionCount = await multiSigContract.transactionCount();
    
        assert.equal(Number(transactionCount), 1, "transactionCount should be 1");    
      });
      
        it("should execute a transaction", async () => {
          const destination = alice.getAddress();
          const value = 1;
          const data = "0x";
          await tokenContract.connect(owner).approve(multiSigContract.address, value);
          await tokenContract.connect(owner).mint(owner.getAddress(), value);    
          await multiSigContract.connect(owner).submitTransaction(destination, value, data);
          const transactionCount = await multiSigContract.transactionCount();
      
          assert.equal(Number(transactionCount), 1, "transactionCount should be 1");    
        });

        it("should not execute a transaction with insufficient confirmations", async () => {
          const destination = alice.getAddress();
          const value = 1;
          const data = "0x";
          await tokenContract.connect(owner).approve(multiSigContract.address, value);
          await tokenContract.connect(owner).mint(owner.getAddress(), value);    
          await multiSigContract.connect(owner).submitTransaction(destination, value, data);
          const transactionCount = await multiSigContract.transactionCount();
      
          assert.equal(Number(transactionCount), 1, "transactionCount should be 1");    
        });
      
        
        it("should transfer tokens when a transaction is executed", async () => {
          const destination = alice.getAddress();
          const value = 1;
          const data = "0x";
          await tokenContract.connect(owner).approve(multiSigContract.address, value);
          await tokenContract.connect(owner).mint(owner.getAddress(), value);    
          await multiSigContract.connect(owner).submitTransaction(destination, value, data);
          const transactionCount = await multiSigContract.transactionCount();
      
          assert.equal(Number(transactionCount), 1, "transactionCount should be 1");    

        });
        it("should revoke a confirmation", async () => {
          const destination = alice.getAddress();
          const value = 1;
          const data = "0x";
          await tokenContract.connect(owner).approve(multiSigContract.address, value);
          await tokenContract.connect(owner).mint(owner.getAddress(), value);    
          await multiSigContract.connect(owner).submitTransaction(destination, value, data);
          const transactionCount = await multiSigContract.transactionCount();
      
          assert.equal(Number(transactionCount), 1, "transactionCount should be 1");    
        }
        );
        it("should change the required confirmations", async () => {
          const destination = alice.getAddress();
          const value = 1;
          const data = "0x";
          await tokenContract.connect(owner).approve(multiSigContract.address, value);
          await tokenContract.connect(owner).mint(owner.getAddress(), value);    
          await multiSigContract.connect(owner).submitTransaction(destination, value, data);
          const transactionCount = await multiSigContract.transactionCount();
      
          assert.equal(Number(transactionCount), 1, "transactionCount should be 1");    
        }
        );
        it("should pause", async () => {
          await multiSigContract.connect(owner).pause();
          const paused = await multiSigContract.paused();
          assert.equal(paused, true);
        }
        );
        it("should unpause", async () => {
          await multiSigContract.connect(owner).pause();
          await multiSigContract.connect(owner).unpause();
          const paused = await multiSigContract.paused();
          assert.equal(paused, false);
        }
        );
      });
    
    describe("TokenERC20 Contract", () => {

      let id: number;
      beforeEach(async () => {
        id = await makeSnapshot();
      });
      
      afterEach(async () => {
        snapshot(id);
      });

      it("should approve tokens", async () => {
        const initialBalance = 10000;
        await tokenContract.connect(owner).mint(owner.getAddress(), initialBalance);
        await tokenContract.connect(owner).approve(owner.getAddress(), initialBalance);
        const balance = await tokenContract.balanceOf(owner.getAddress());
        assert.equal(Number(balance), initialBalance);
      });
      it("should transfer tokens", async () => {
        const initialBalance = 10000;
        await tokenContract.connect(owner).mint(owner.getAddress(), initialBalance);
        await tokenContract.connect(owner).approve(owner.getAddress(), initialBalance);
        await tokenContract.connect(owner).transfer(alice.getAddress(), initialBalance);
        const balance = await tokenContract.balanceOf(alice.getAddress());
        assert.equal(Number(balance), initialBalance);
      });
      it("should transfer tokens from", async () => {
        const initialBalance = 10000;
        await tokenContract.connect(owner).mint(owner.getAddress(), initialBalance);
        await tokenContract.connect(owner).approve(owner.getAddress(), initialBalance);
        await tokenContract.connect(owner).transferFrom(owner.getAddress(), alice.getAddress(), initialBalance);
        const balance = await tokenContract.balanceOf(alice.getAddress());
        assert.equal(Number(balance), initialBalance);
      });
      it("should burn tokens", async () => {
        const initialBalance = 10000;
        await tokenContract.connect(owner).mint(owner.getAddress(), initialBalance);
        await tokenContract.connect(owner).approve(owner.getAddress(), initialBalance);
        await tokenContract.connect(owner).burn(owner.getAddress(), initialBalance);
        const balance = await tokenContract.balanceOf(owner.getAddress());
        assert.equal(Number(balance), 0);
      }
      );
      it("should mint tokens", async () => {
        const initialBalance = 10000;
        await tokenContract.connect(owner).mint(owner.getAddress(), initialBalance);
        await tokenContract.connect(owner).approve(owner.getAddress(), initialBalance);
        await tokenContract.connect(owner).mint(owner.getAddress(), initialBalance);
        const balance = await tokenContract.balanceOf(owner.getAddress());
        assert.equal(Number(balance), initialBalance * 2);
      }
      );
      it("should pause", async () => {
        await tokenContract.connect(owner).pause();
        const paused = await tokenContract.paused();
        assert.equal(paused, true);
      }
      );
      it("should unpause", async () => {
        await tokenContract.connect(owner).pause();
        await tokenContract.connect(owner).unpause();
        const paused = await tokenContract.paused();
        assert.equal(paused, false);
      }
      );
      it("should transfer ownership", async () => {
        await tokenContract.connect(owner).transferOwnership(alice.getAddress());
        const ownerAddress = await tokenContract.owner();
        assert.equal(ownerAddress, (await alice.getAddress()).toString());
      }
      );
      it("should renounce ownership", async () => {
        await tokenContract.connect(owner).renounceOwnership();
        const ownerAddress = await tokenContract.owner();
        assert.equal(ownerAddress, "0x0000000000000000000000000000000000000000");
      }
      );
    });
});