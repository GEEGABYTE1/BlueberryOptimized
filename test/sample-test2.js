
const { ContractFactory } = require("ethers");
const hre = require("hardhat");
const ContractJson = require('../artifacts/contracts/Greeter.sol/Greeter.json')    // Contract Abi
const abi = ContractJson.abi



async function main() {

    const alchemy = new hre.ethers.providers.AlchemyProvider(
        'maticmum',
        process.env.ALCHEMY_API_KEY
    )

    const userWallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY, alchemy)

    const Greeter = new hre.ethers.Contract(
        process.env.CONTRACT_ADDRESS,
        abi,
        userWallet
    )

    const setTx1 = await Greeter.setGreeting("Hi")
    await setTx1.wait() // wait for transaction to be mined
    console.log(`Before: ${await Greeter.greet()}`)
    
    
    const setTx2 = await Greeter.setGreeting("This works?")
    await setTx2.wait()
    console.log('After: ' + await Greeter.greet())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });