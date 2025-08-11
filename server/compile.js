import path from 'path';
import fs from 'fs/promises';
import solc from 'solc';
import { fileURLToPath } from 'url';

// ESM doesn't have __dirname by default
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to Solidity file
const contractsPath = path.join(__dirname, 'contracts', 'Contract.sol');
const source = await fs.readFile(contractsPath, 'utf8');

// Prepare compiler input
const input = {
  language: 'Solidity',
  sources: {
    'Contract.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['abi', 'evm.bytecode'],
      },
    },
  },
};

// Compile using solc
const output = JSON.parse(solc.compile(JSON.stringify(input)));

// Replace with your actual contract name
const contractName = 'MyContract';
const compiled = output.contracts['Contract.sol'][contractName];

export { compiled }