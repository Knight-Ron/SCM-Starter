Sure, here is the `README.md` content in a single box without any code blocks.

---

# Ethereum Smart Contract ATM

This project demonstrates the creation and interaction with a simple Ethereum ATM smart contract using Hardhat and ethers.js.

## Project Structure

- `contracts/Assessment.sol`: Solidity smart contract for the ATM.
- `scripts/deploy.js`: Deployment script for the smart contract.
- `pages/index.js`: Frontend code to interact with the deployed smart contract using Next.js and ethers.js.

## Prerequisites

- Node.js
- npm or yarn
- Hardhat
- Metamask extension for your browser

## Getting Started

1. Clone the repository: `https://github.com/Knight-Ron/SCM-Starter` and navigate to the project directory.
2. Install dependencies: `npm install` or `yarn install`.
3. Compile the smart contract: `npx hardhat compile`.
4. Deploy the smart contract: Update the `scripts/deploy.js` script if necessary, then run `npx hardhat run scripts/deploy.js --network <your-network>` (replace `<your-network>` with the network of your choice, e.g., `localhost`, `rinkeby`, etc.).
5. Start the Next.js frontend: `npm run dev` or `yarn dev`.
6. Open the application: Navigate to `http://localhost:3000` in your browser.

## Usage

- Connect Metamask: Click the "Interface with your Metamask wallet block, if you please 🦊" button to connect your Metamask wallet.
- Endow 1 ETH: Click the "Endow 1 ETH 🪙" button to deposit 1 ETH into the contract.
- Reclaim 1 ETH: Click the "Reclaim 1 ETH 💵" button to withdraw 1 ETH from the contract.

## Smart Contract

The smart contract `Assessment.sol` is a simple ATM contract with deposit and withdraw functions.

### Contract Deployment Script

The `scripts/deploy.js` script deploys the `Assessment` contract with an initial balance of 1 ETH.

## Frontend

The frontend code in `pages/index.js` uses ethers.js to interact with the deployed smart contract.

### Styles and Animations

The application features a dark orange and black striped background, with large buttons that animate when clicked. The text and buttons use a medieval-themed font and styling for a unique user experience.

