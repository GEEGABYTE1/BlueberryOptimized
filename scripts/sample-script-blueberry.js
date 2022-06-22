
const hre = require("hardhat")
var Web3 = require('web3')
var web3 = new Web3(Web3.givenProvider || process.env.API_URL)

async function main() {

    test_props = ['prop1', 'prop2', 'prop3']
    hexed = []

    for (let test_prop_idx = 0; test_prop_idx <= test_props.length; test_props++) {
        test_prop = test_props[test_prop_idx]
        string_sha3 = web3.utils.sha3(test_prop)
        hexed_proposals = web3.utils.hexToBytes(string_sha3)
        hexed.push(hexed_proposals)
    }

    

    const Blueberry = await hre.ethers.getContractFactory("Ballot")
    const blueberry = await Blueberry.deploy(hexed)

    await blueberry.deployed();

    console.log('New Blueberry Deployed to:', blueberry.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
