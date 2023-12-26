# [WIP] MultiSig Wallet

The `MultiSig` wallet is a type of wallet where multiple parties must sign off on a transaction before it can be executed. This adds an extra layer of security for the wallet and is particularly useful for managing shared funds.

In this project, the `MultiSig` contract is implemented in Solidity. It allows a group of owners to submit, confirm, and execute transactions. The contract requires a minimum number of confirmations from the owners for a transaction to be executed.

The `MultiSig` contract has the following key features:

- **Transaction Proposals:** Any owner can propose a transaction. This transaction is not executed immediately but is stored on the contract for the owners to review.

- **Transaction Confirmations:** After a transaction is proposed, the owners can confirm the transaction by calling a function on the contract. The number of confirmations required is set when the contract is deployed.

- **Transaction Execution:** Once a transaction has received the required number of confirmations, any owner can execute the transaction. The transaction will call a function on another contract or send Ether to an address.

- **Owner Management:** The contract allows for adding and removing owners and changing the required number of confirmations. These operations themselves are also subject to the multisig mechanism.

This type of wallet is a powerful tool for organizations to ensure that funds are managed with consensus and provides a robust security model against unauthorized transactions.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Deployment](#deployment)
- [Testing](#testing)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of [Node.js and npm](https://nodejs.org/en/download/).

## Installation

To install the project, follow these steps:

1. Clone the repository:

    ```
    git clone <repository_url>  
    ```

2. Navigate to the project directory:

    ```
    cd <project_directory> 
    ```

3. Install the dependencies:

    ```
    npm install 
    ```

## Deployment

The project uses Hardhat as a development environment for compilation, testing, and deployment of the smart contracts.

### LocalHost

1. To compile the contracts without deploying, run:

    ```
    npx hardhat node --no-deploy
    ```

2. To deploy the MultiSig contract to your local network, run:

    ```
    npx hardhat deploy --network localhost --tags MultiSig
    ```

3. To deploy the TokenERC20 contract to your local network, run:

    ```
    npx hardhat deploy --network localhost --tags TokenERC20
    npx hardhat test --network localhost
    ```

## Testing

The project includes a suite of tests that you can run to verify the functionality of the contracts. To run the tests, open a new terminal and run:

    ```
    npx hardhat test --network localhost
    ```
