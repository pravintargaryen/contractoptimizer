import HDWalletProvider from '@truffle/hdwallet-provider';
import Web3 from 'web3';
import { compiled } from './compile.js'; 
import dotenv from 'dotenv';
dotenv.config();

const deploy = async () => {
  console.log('🚀 Deploying contract...');
  console.log('🧪 Compiling source...');

  const mnemonic = process.env['MNEMONIC'];
  const infuraUrl = process.env['RPC_URL']; 
  const provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonic,
  },
  providerOrUrl: infuraUrl,
});
  const web3 = new Web3(provider);

  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(compiled.abi)
    .deploy({ data: compiled.evm.bytecode.object, arguments: [5] })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  return result.options.address;
};

export default deploy;
