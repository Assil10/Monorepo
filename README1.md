Blockchain Workflow Documentation – Korpor Project
1. Overview
This document describes the technical workflow and tools used to develop, deploy, and test the blockchain component of the Korpor mobile application. The current phase focuses on validating a basic smart contract on the Ethereum Sepolia Testnet, with no cryptocurrency required from end users.

The blockchain is used strictly for logging and tracking investment activity, ensuring data transparency and auditability. Payments are handled off-chain.

2. Technologies Used
Technology	Purpose
Solidity	Programming language used to develop smart contracts.
Remix IDE	Online development environment for rapid Solidity prototyping and testing.
Hardhat   	Local development framework for compiling, deploying, and testing smart contracts.
Ethers.js	JavaScript library used to interact with the Ethereum blockchain programmatically.
Node.js	    Runtime environment for executing scripts (deployment, interaction).
Metamask	Browser wallet used to manage Ethereum test accounts and sign transactions.
Sepolia     Testnet	Ethereum test network used for deploying and testing contracts with test ETH.
Alchemy	    RPC provider to connect Hardhat and Ethers.js to the Sepolia testnet.
Etherscan   (Sepolia)	Blockchain explorer to view contract deployment, transactions, and events.
3. Workflow
3.1 Contract Development
A simple smart contract (Korpor.sol) was developed to simulate investment logging.

It defines an Investment struct with the following properties:

Investor address

Project ID (string)

Investment amount

Timestamp

It provides:

logInvestment() function to write a new investment entry to the blockchain

getAll() function to return the list of recorded investments

NewInvestment event to emit metadata upon logging

3.2 Testing Environment
Remix IDE
Used as the initial development and testing platform.

Allowed interactive testing using the injected Web3 provider (Metamask).

Deployed contracts and executed transactions using the Sepolia network.

Hardhat
Used for more structured local development and automation.

Enabled:

Project scaffolding

Compilation of contracts

Custom deployment scripts

Programmatic interaction using Ethers.js

Connected to Sepolia via Alchemy RPC URL.

3.3 Wallet Configuration
Metamask was used to manage the developer account and connect to the Sepolia network.

The wallet was funded with test ETH from a Sepolia faucet to cover gas fees during deployment and testing.

3.4 Deployment Process
Using Remix IDE
Compile the contract in Remix.

Connect to Sepolia via Metamask (Injected Provider).

Deploy the contract and confirm in Metamask.

Execute functions directly within the Remix interface.

Using Hardhat
Initialize a new Hardhat project (npx hardhat).

Create the Solidity contract in /contracts/Korpor.sol.

Configure Sepolia in hardhat.config.js using:

RPC URL from Alchemy

Private key from Metamask (stored in .env)

Write deployment script in /scripts/deploy.js.

Deploy using:

bash
Copy
Edit
npx hardhat run scripts/deploy.js --network sepolia
3.5 Interaction and Logging
Interactions with the smart contract were tested through:

Remix interface (manually)

Custom Node.js script using Ethers.js (programmatically)

Example usage:

logInvestment("Project123", 1000)

Fetch all logs using getAll()

Events were successfully emitted and visible on Sepolia Etherscan.

3.6 Blockchain Explorer Usage
The deployed contract was located and monitored using Sepolia Etherscan.

Transactions, event logs, and function calls were reviewed and confirmed.

This ensured proper state changes and contract functionality