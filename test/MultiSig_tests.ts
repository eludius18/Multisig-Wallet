import { deployments, ethers } from "hardhat";
import { Signer } from "ethers";
import assert from 'assert';
import { MultiSig } from "../typechain-types";
import { Deployment } from "hardhat-deploy/dist/types";

describe("Multisig Test", async function () {
  let accounts: Signer[];
  let multisigDeployment: Deployment;
  let multisigContract: MultiSig;
  let owner: Signer;
  let alice: Signer;
  let bob: Signer;

  before(async function () {
    accounts = await ethers.getSigners();
    owner = accounts[0];
    alice = accounts[1];
    bob = accounts[2];

    multisigDeployment = await deployments.get("MultiSig");
    multisigContract = await ethers.getContractAt(
      "MultiSig",
      multisigDeployment.address
    );
  });

  describe('storing ERC20 tokens', function () {
    const initialBalance = 10000;
    let token: any;

    beforeEach(async () => {
      const EIP20 = await ethers.getContractFactory("EIP20");
      token = await EIP20.deploy(initialBalance, 'My Token', 1, 'MT');
      await token.deployed();
      await token.transfer(multisigContract.address, initialBalance);
    });

    it('should store the balance', async () => {
      const balance = await token.balanceOf(multisigContract.address);
      assert.equal(balance.toNumber(), initialBalance);
    });

    describe('executing an ERC20 transaction', function () {
      beforeEach(async () => {
        const data = token.interface.encodeFunctionData("transfer", [accounts[2], initialBalance]);
        await multisigContract.submitTransaction(token.address, 0, data);
      });

      it('should have removed the contract balance', async () => {
        const balance = await token.balanceOf(multisigContract.address);
        assert.equal(balance.toNumber(), 0);
      });

      it('should have moved the balance to the destination', async () => {
        const balance = await token.balanceOf(accounts[2]);
        assert.equal(balance.toNumber(), initialBalance);
      });
    });
  });

  describe('storing ether', function () {
    beforeEach(async () => {
      const signer = await ethers.provider.getSigner(0);
      await signer.sendTransaction({ to: multisigContract.address, value: 1 });
    });

    it('should store the balance', async () => {
      const balance = await ethers.provider.getBalance(multisigContract.address);
      assert.equal(balance.toString(), "1");
    });

    describe('executing the ether transaction', function () {
      let balanceBefore: any;

      beforeEach(async () => {
        balanceBefore = await ethers.provider.getBalance(accounts[1]);
        await multisigContract.submitTransaction(accounts[1], 1, "0x");
      });

      it('should have removed the multisigContract balance', async () => {
        const balance = await ethers.provider.getBalance(multisigContract.address);
        assert.equal(BigInt(balance), BigInt(0));
      });

      it('should have moved the balance to the destination', async () => {
        const balance = await ethers.provider.getBalance(accounts[1]);
        assert.equal((balance - balanceBefore).toString(), "1");      });
    });
  });
});