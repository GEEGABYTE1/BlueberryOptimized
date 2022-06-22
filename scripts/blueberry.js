const { ContractFactory } = require('ethers')
const hre = require('hardhat')
var Web3 = require('web3')
var web3 = new Web3(Web3.givenProvider || process.env.API_URL)
const ContractJson = require('../artifacts/contracts/Ballot.sol/Ballot.json')
const abi = ContractJson.abi

// Discord Initialization
const Discord = require('discord.js')
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const prefix = '-'

// Contract Connection Initialization
const alchemy = new hre.ethers.providers.AlchemyProvider(
    'goerli',
    process.env.ALCHEMY_API_KEY
)
const headWallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY, alchemy)
const headBallot = new hre.ethers.Contract(
    process.env.TEMP_CONTRACT_ADDRESS,
    abi,
    headWallet
)
let options = {'gasPrice': 21000, 'gasLimit':320000}

// Voting Initialization
let proposals = ['prop1']




async function running () {
    console.log('Discord Bot Attempting to Run')
    const fs = require('fs')
    client.commands = new Discord.Collection()

    await client.once('ready', () => {
        console.log('Bluberry is online')
    })
}

let wallets = {}

client.on('message', async function (message) {
    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args[0]
    


    const list = client.guilds.cache.get('977377262984908845')  

    if (command === 'sign_in') {                                                    // sign_in wallet_address private_key
        if (message.member.roles.cache.has('978003617363681440')) {
            message.channel.send('You are already signed in!')
            
        } else {
            lst_of_args = args.slice(1)
            address = lst_of_args[0]
            check_address = web3.utils.isAddress(address)
            if (check_address === true) {
                
                user_wallet = check_address
                
                message.delete()
                message.member.send('**Note**: to send votes, it is needed that you put in your private_key')
                message.member.send('BlueBerry or its developers will never use or even access private_keys at all.')
                
               
                message.member.roles.add('978003617363681440')
                message.channel.send(`${message.author.username} will become ${address}`)
                message.author.username = String(address)
                console.log(message.author.username)
                private_address = lst_of_args[1]
                wallets[String(address)] = private_address

                setTx1 = await headBallot.giveRightToVote(String(address), options)
                await setTx1.wait()
                console.log(setTx1)
                message.channel.send('You have signed in')


                
                
            } else {
              message.member.send(`Your wallet: ${address} was invalid!`)
            }
        }

    } else if (command === 'delegate') {    // delegate your_user_address goal_user_address
        try {
            lst_of_addresses = args.slice(1)
            our_address = lst_of_addresses[0]
            goal_address = lst_of_addresses[1]

            our_private_key = wallets[our_address]
            let userWallet = new hre.ethers.Wallet(our_private_key, alchemy)
            const userBallot = new hre.ethers.Contract (
                process.env.TEMP_CONTRACT_ADDRESS,
                abi,
                userWallet
            )

            const setTx2 = await userBallot.delegate(goal_address, options)
            await setTx2.wait()
            message.channel.send(`${goal_address} was delegated a vote from ${our_address}`)
        } catch (err) {
            message.member.send('There was an error processing the delegation')
            message.member.send('Please review documentation if you require assistance')
        }

    }





})


client.login('OTc3OTU2OTQ0NDQwNjIzMTU1.Gi73KR.1DQ6M3S8J4hGz0iC_3ub763AfdKnAHmlsVuW_Y')

running()