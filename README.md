# 🧠 AI-Powered Smart Contract Optimizer

An NLP-driven Solidity optimizer that takes natural language goals (e.g., “Optimize for gas under 10,000”) and produces optimized smart contracts, then deploys them to a blockchain testnet.

This is a prototype demonstrating semantic parsing, mock optimization, and automatic deployment to Sepolia Testnet.


## 📌 Features
React Frontend – Users type optimization goals in plain English

Express Backend – Parses goals, applies mock or real optimizations

Blockchain Deployment – Deploys contracts to Sepolia via Web3.js & HDWalletProvider

Mock Optimizer – Simple regex/code transformation to simulate optimization logic

LLM Integration – Extracts optimization intent & constraints from user prompt

## 🖼 Architecture

```
React Frontend  -->  Express API  -->  LLM Parser  -->  Mock Optimizer  -->  Web3 Deployment

```

## 🚀 Getting Started
## Clone the Repo
```
# Backend
cd server
npm install

# Frontend
cd ../client
npm install

# env
TOGETHER_API_KEY=your_llm_api_key
MNEMONIC="your_wallet_mnemonic"
RPC_URL="https://sepolia.infura.io/v3/your_infura_key"
```


## 📜 License
MIT
