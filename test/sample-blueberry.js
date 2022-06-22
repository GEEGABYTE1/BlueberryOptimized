const { ContractFactory } = require("ethers");
const hre = require('hardhat')
const ContractJson = require('../artifacts/contracts/Ballot.sol/Ballot.json')
const abi = ContractJson.abi

async function main() {

    const alchemy = new hre.ethers.providers.AlchemyProvider(
        'goerli',
        process.env.ALCHEMY_API_KEY
    )

    const userWallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY, alchemy)

    
    const Ballot = new hre.ethers.Contract (
        process.env.CONTRACT_ADDRESS,
        abi,
        userWallet
    )
    let options = {'gasPrice': 21000, 'gasLimit':320000}
    const setTx1 = await Ballot.giveRightToVote('0x127a95027B5c7E1D807433837C9cDD7e6f336803', options) // Error was caused by ABI not being 
    await setTx1.wait()                                                                               // updated with new contracts
    console.log(setTx1)

    

    
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });