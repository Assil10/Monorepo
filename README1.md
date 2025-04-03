Blockchain Workflow Documentation – Korpor Project
1. Overview
This document describes the technical workflow and tools used to develop, deploy, test, and host the blockchain component of the Korpor mobile application. The implementation currently focuses on validating a simple smart contract on the Ethereum Sepolia Testnet, with no cryptocurrency required from end users.

Blockchain is used exclusively to log and track investment activity for transparency and auditability. Payments and sensitive user data are handled off-chain.

2. Technologies Used
Solidity
Used to develop the smart contract that records investment activity.

Remix IDE
Online IDE used for prototyping and testing Solidity contracts quickly with Sepolia via Metamask.

Hardhat
Local development environment for compiling, deploying, and scripting interactions with smart contracts.

Ethers.js
JavaScript library used to programmatically interact with the Ethereum blockchain.

Node.js
Used to run backend scripts for contract deployment and interaction.

Metamask
Browser wallet used to manage developer test accounts and sign transactions on Sepolia.

Sepolia Testnet
Ethereum test network used to simulate real deployments and transaction flows with test ETH.

Alchemy
RPC provider used to connect Hardhat and Ethers.js to the Sepolia testnet securely and reliably.

Etherscan (Sepolia)
Block explorer used to view smart contract deployment, transactions, and emitted events.

Firebase / Supabase (Planned for Production)
External databases planned for storing off-chain metadata (users, projects, media, etc.)

Render / Railway / Vercel (Planned for Hosting)
Free-tier backend hosting platforms for deploying APIs and admin dashboards.

3. Workflow
3.1 Contract Development
A basic smart contract named Korpor.sol was developed to simulate investment logging.

It includes:

A struct called Investment with fields:

Investor address

Project ID (string)

Investment amount

Timestamp

A public function logInvestment() to write investment data on-chain

A public view function getAll() to retrieve all investment logs

An event NewInvestment to notify the blockchain of new investment entries

3.2 Testing Environment
Remix IDE

Used to quickly compile and test the contract

Connected to Metamask (Sepolia) for contract deployment

Allowed manual interaction with contract functions

Hardhat

Used for structured project scaffolding and automation

Connected to Sepolia via Alchemy RPC

Supported writing custom scripts to deploy and interact with the contract

Enabled scripting of function calls using Ethers.js

3.3 Wallet Configuration
Metamask wallet was connected to the Sepolia testnet

The wallet was funded with test ETH from a Sepolia faucet

Used to confirm transactions in both Remix and Hardhat environments

3.4 Deployment Process
Using Remix IDE

Compile contract via the Remix Solidity compiler

Select Injected Web3 provider (Metamask) connected to Sepolia

Deploy contract and confirm the transaction in Metamask

Test function calls in the Remix UI

Using Hardhat

Initialize the project using npx hardhat

Write contract in contracts/Korpor.sol

Configure hardhat.config.js with Sepolia RPC and private key via .env

Create a deployment script in scripts/deploy.js

Deploy contract with:

arduino
Copy
Edit
npx hardhat run scripts/deploy.js --network sepolia
3.5 Interaction and Logging
Contract interaction was tested via:

Manual calls in Remix IDE

Node.js script using Ethers.js to simulate real interaction

Example:

logInvestment("ProjectX", 5000) was used to simulate a logged investment

getAll() was used to retrieve a list of logged transactions

Emitted NewInvestment events were verified via Sepolia Etherscan.

3.6 Blockchain Explorer Usage
The contract and its transactions were inspected using Sepolia Etherscan

Verified contract deployment address, input data, and output logs

Ensured that state changes matched expected behavior after function calls

4. Hosting and Data Management Workflow
4.1 Blockchain Data
Only essential transaction data (investor address, project ID, amount, timestamp) is stored on-chain

No personal user data or media is stored on the blockchain

Blockchain is used for audit trails and proof of transaction

4.2 Off-Chain Data (Planned)
User profiles, documents, and project metadata will be stored in a secure off-chain database such as Firebase or Supabase

This ensures GDPR compliance and reduces blockchain storage costs

4.3 Backend and API Hosting (Planned)
The backend (e.g., Node.js/Express or NestJS) will be hosted on Render, Railway, or Vercel

This API will:

Handle payment verification (e.g., Stripe, PayPal)

Call the smart contract functions after payment confirmation

Serve data to the mobile app via REST/GraphQL endpoints

4.4 Frontend Access
The mobile app will not directly interact with the blockchain

It will fetch verified data from the backend, which securely handles blockchain interactions

Future updates may include admin dashboards for real-time blockchain event monitoring

This workflow ensures a reliable separation of responsibilities:

Blockchain handles public, immutable investment logs

The backend handles payments, permissions, and user identities

Off-chain storage ensures performance and regulatory compliance