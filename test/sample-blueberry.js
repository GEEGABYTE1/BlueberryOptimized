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
    /*
    const setTx1 = await Ballot.giveRightToVote('0x127a95027B5c7E1D807433837C9cDD7e6f336803', options) // Error was caused by ABI not being 
    await setTx1.wait()                                                                               // updated with new contracts
    console.log(setTx1)*/

    /*const setTx2 = await Ballot.delegate('0x127a95027B5c7E1D807433837C9cDD7e6f336803', options)
    await setTx2.wait()
    console.log(setTx2)*/
    
    const userWallet2 = new hre.ethers.Wallet(process.env.PRIVATE_KEY2, alchemy)
    const user2Ballot = new hre.ethers.Contract (
      process.env.CONTRACT_ADDRESS,
      abi,
      userWallet2
    )

    /*const setTx3 = await user2Ballot.vote(0, options)
    await setTx3.wait()
    console.log('You have successfully voted!')*/

    const setTx4 = await Ballot.winnerName()

    console.log(setTx4)

    

    
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });