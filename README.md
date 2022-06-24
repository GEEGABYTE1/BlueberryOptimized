# Blueberry 🫐

A discord bot that allows servers to convert themselves into fully-autonomous voting DAOs. Blueberry allows for servers to have
their voting systems be run by Ethereum either through L1 or L2 networks. 

Blueberry does allow for versatile voting smart contracts, however, in its beta stage, due to the commands that are programmed, the bot can only take basic commands of `Ballot.sol`. (View `Ballot.sol` to get an idea of the functions). Moreover, custom tokens are compatiable as long as the voting actions are completely synchronous with the custom token - **the bot cannot take separate contracts!**


# Pre-Installation 🌅

The integration of the bot process into a server remains the same (after all, it is a discord bot!). If one requires any help, they can visit the website: [here] (https://www.alphr.com/add-bots-discord-server/)

A Base `Ballot.sol` smart contract is already integrated within the bot, and therefore, will run the voting proposals and processes based on the initial smart contract. However, if the server wants to alter the smart contract, they must create a `.env` file and set:
`CONTRACT_ADDRESS='contract_address_from_deployment`, within the directory of the bot. Every time a ballot is created, the same contract will be deployed, and thus, it must be noted by the server of which contract to integrate as it becomes challenging to shift contracts. 


**Note**: Since the bot is under beta, `.env` variables on the script on Github is yet to change.

Blueberry's node provider is Alchmey, and is currently running on the Goerli test network. However, as time moves on, the bot will shift to Mainnet from the Testnet.


# Commands 💪🏻

Blueberry comes with pre-set Commands in its beta stage that revolve only around voting and creating ballots. Such commnads currently include:

## Sign In 🏎

Discord Bot Command: `-sign_in [WALLET_ADDRESS] [PRIVATE_KEY]`.

This is the first command all users should type in when joining a discord server to be apart of the server vote. This in-turn, will let users type in commands that will let them interact with the smart contract.

*Note*: Blueberry does not keep the private address of the user and hides it on the discord server by deleting the ouput on the server. The private key is only needed to allow users to interact with the smart contract with a Wallet Object, which requires their private address.

## Delegate 📲

Discord Bot Command: `-delegate [SENDER_WALLET_ADDRESS] [RECEIVER_WALLET_ADDRESS]`.

Allows users to delegate (or send) their votes to a desired user that has not voted. It should *noted* that the **sender* user must not have yet voted, otherwise, the transaction will fail.

Moreover, the wallet address that has initialized the ballots or smart contract, cannot delegate themselves either to ensure that there is no circular voting.

## Vote 🗳

Discord Bot Command: `-vote [WALLET_ADDRESS] [INDEX]` 

Allows users to vote on a ballot. The index must be between `0 <= x < n(proposals)` where `n = number of proposals in the ballot`. If the index exceeds the length or is not a **digit**, the transaction will fail. 

As seen by voting, when initializing a contract or a ballot, there must be a list of proposals within one ballot. View (*Propose*) for more information regarding initializing ballots. 

## Win ✅

Discord Bot Command: `-win`

Outputs the proposal that has won. This can only be outputted when there are votes made and if there were proposals. Failure to create votes will either fail transaction or will output data that is not relevant nor accurate.

## Propose 🤔

Discord Bot Command: `-propose 'string`.

The `string` represents the content of the proposal. All users will have the ability to submit a proposal, but will not always ensure that it will be submitted to the ballot.

The base time interval for every ballot to deployed is 5 minuttes. However, it can be changed with the command `-time 'minutes'`. This will set the interval time for ballot deployment.

For ballots, there are at most 3 proposals that can be added. In turn, this means that a user has a `3/n` chance of making their proposal on the ballot, where `n = number of proposals submitted`. Though, if there are less than 3 proposals that have been submitted, by nature, all proposals will be added to the ballot.

After a `-win` has been declared, all proposals related to the ballot will be overriden.

## Time ⏰

Discord Bot Command: `-time 'minutes'`.

Sets the time interval for ballots to deploy. The default is 5 minutes. `minutes` must be a number (i.e, 2, 4, 5, 10), in order for the command to work.

# Errors 🚫

When it comes to general errors, the most common ones occur when users do not have much eth in their wallet. Although, the transactions are free, they must taken into consideration gas prices. 

Another common error is failure to understand how the command works or smart contract development flaws. In such cases, the developer should be contacted.

# More Information 🔎

Developer with Ethers, Web3, Alchemy API

Questions, comments, or reporting a bug? Visit my [website](www.jaivalpatel.com) to find places to contact me!

Made by Jaival Patel 🦖