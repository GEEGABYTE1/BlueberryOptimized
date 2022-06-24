# Blueberry

A discord bot that allows servers to convert themselves into fully-autonomous voting DAOs. Blueberry allows for servers to have
their voting systems be run by Ethereum either through L1 or L2 networks. 

Blueberry does allow for versatile voting smart contracts, however, in its beta stage, due to the commands that are programmed, the bot can only take basic commands of `Ballot.sol`. (View `Ballot.sol` to get an idea of the functions). Moreover, custom tokens are compatiable as long as the voting actions are completely synchronous with the custom token - **the bot cannot take separate contracts!**


# Pre-Installation

The integration of the bot process into a server remains the same (after all, it is a discord bot!). If one requires any help, they can visit the website: [here] (https://www.alphr.com/add-bots-discord-server/)

A Base `Ballot.sol` smart contract is already integrated within the bot, and therefore, will run the voting proposals and processes based on the initial smart contract. However, if the server wants to alter the smart contract, they must create a `.env` file and set:
`CONTRACT_ADDRESS='contract_address_from_deployment`, within the directory of the bot.

**Note**: Since the bot is under beta, `.env` variables on the script on Github is yet to change.

Blueberry's node provider is Alchmey, and is currently running on the Goerli test network. However, as time moves on, the bot will shift to Mainnet from the Testnet.


# Commands


# Errors