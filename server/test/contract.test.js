import assert from 'assert'; 
import ganache from 'ganache';
import Web3 from 'web3';
import { compiled } from '../compile.js'; // Adjust the path as necessary

// Create web3 instance with Ganache provider
const web3 = new Web3(ganache.provider());

// Set up accounts and contract instance
let accounts;
let contractInstance;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  contractInstance = await new web3.eth.Contract(compiled.abi)
    .deploy({ data: compiled.evm.bytecode.object, arguments: [2] })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('Contract Tests', () => {
  it('should deploy a contract', async () => {
    assert.ok(contractInstance.options.address, 'Contract not deployed');
  });

  it ('should return the initial value', async () => {
    const initialValue = await contractInstance.methods.myNumber().call();
    assert.strictEqual(Number(initialValue), 2, 'Initial value is not 2');
  });

  it ('should update the value', async () => {
    await contractInstance.methods.setMyNumber(5).send({ from: accounts[0] });
    const updatedValue = await contractInstance.methods.myNumber().call();
    assert.strictEqual(Number(updatedValue), 5, 'Updated value is not 5');
  });
});

 