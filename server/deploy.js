import HDWalletProvider from '@truffle/hdwallet-provider';
import Web3 from 'web3';
import { compiled } from './compile.js'; 

const deploy = async () => {
  console.log('🚀 Deploying contract...');
  console.log('🧪 Compiling source...');

  const mnemonic = 'bless blouse perfect trick small popular scare puppy lunch session happy thought';
  const infuraUrl = 'https://sepolia.infura.io/v3/a2a11d310b494ae781438879e0b8ef51'; 
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
