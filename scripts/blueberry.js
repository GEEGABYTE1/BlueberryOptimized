const { ContractFactory } = require('ethers')
const hre = require('hardhat')
var Web3 = require('web3')
var web3 = new Web3(Web3.givenProvider || process.env.API_URL)
const ContractJson = require('../artifacts/contracts/Ballot.sol/Ballot.json')
const abi = ContractJson.abi

// Discord Initialization
const Discord = require('discord.js')
const { hexZeroPad } = require('ethers/lib/utils')
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const prefix = '-'

// Contract Connection Initialization
const contract_address = process.env.TEMP_CONTRACT_ADDRESS
const alchemy = new hre.ethers.providers.AlchemyProvider(
    'goerli',
    process.env.ALCHEMY_API_KEY
)
const headWallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY, alchemy)
const headBallot = new hre.ethers.Contract(
    contract_address,
    abi,
    headWallet
)
let options = {'gasPrice': 21000, 'gasLimit':320000}

// Voting Initialization
sha3_prop = web3.utils.sha3('prop1')
let proposals = {'prop1':web3.utils.hexToBytes(sha3_prop)}

// Temp Proposals 

let temp_proposals = [] // Need 3 proposals to create ballot


function partition_for_ballot (proposals=temp_proposals) {
    
    if (proposals.length === 0) {
        return false
    } else {
        let chosen_proposals = []
        let index = 0
        let length_of_proposals = proposals.length
        let limit = 3 
        if (length_of_proposals < 3) {
            limit = length_of_proposals - 1
        }
    
    
        for (index; index <= limit; index ++) {
            try {
                random_idx = Math.floor(Math.random() * length_of_proposals++) 
                random_proposal = proposals[random_idx]
                chosen_proposals.push(random_proposal)
            } catch (err) {
                console.log('Index was bigger than Length')
            }
    
        }
    
        return chosen_proposals
    }
}
    

function create_new_ballot (strings) {
    try {
        let hexed = []
        for (let string_idx =0; string_idx <= strings.length; string_idx++) {
            string = strings[string_idx]
            string_sha3 = web3.utils.sha3(test_prop)
            hexed_string = web3.utils.hexToBytes(string_sha3)
            hexed.push(hexed_string)
        }
    
        const Blueberry = await hre.ethers.getContractFactory("Ballot")
        const blueberry = await Blueberry.deploy(hexed)
        await blueberry.deployed();
        console.log(`Setting Contract Address to ${blueberry.address}`)
        contract_address = blueberry.address
        message.channel.send('A new Ballot has been successfully made!')

        let string_idx = 0 
        let hexed_idx = 0 
        proposals = {}
        for (string_idx;string_idx <= strings.length; string_idx++) {
            let real_prop = strings[string_idx]
            let rel_hex_string = hexed[string_idx]
            if (real_prop !== undefined && rel_hex_string !== undefined) {
                proposals[real_prop] = rel_hex_string
            }
        }
        

    } catch (err) {
        message.channel.send("There was an error creating a new Ballot!")
    }

    
    

}


async function running () {
    console.log('Discord Bot Attempting to Run')
    const fs = require('fs')
    client.commands = new Discord.Collection()

    await client.once('ready', () => {
        console.log('Bluberry is online')
        
    })
}

let wallets = {}
var time = 300000;

// 5 Minutes

const ballot_creation_interval = setInterval(create_new_ballot(partition_for_ballot()), time) 
ballot_creation_interval()

client.on('message', async function (message) {
    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args[0]
    if (ballot_creation_interval === 0) {
        message.channel.send('There were no propositions made, thus no ballot was made!')
    } else {
        message.channel.send('Propositions are taken into consideration')
    }


    const list = client.guilds.cache.get('977377262984908845')  

    if (time === undefined) {
        message.channel.send('Please set a Ballot Time Delta to Allow for Recurring and Autonomous Voting by typing **-time**!')
    } 
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
            const userBallot = new hre.ethers.Contract(
                contract_address,
                abi,
                userWallet
            )

            const setTx2 = await userBallot.delegate(goal_address, options)
            await setTx2.wait()
            message.channel.send(`${goal_address} was delegated a vote from ${our_address}`)
            console.log(setTx2)
        } catch (err) {
            message.member.send('There was an error processing the delegation')
            message.member.send('Please review documentation if you require assistance')
        }

    } else if (command === 'vote') { // vote your_user_address index

        try {
            let lst_of_args = args.slice(1)
            let address = lst_of_args[0]
            let rel_private_key = wallets[address]

            const rel_user_wallet = new hre.ethers.Wallet(rel_private_key, alchemy)
            const rel_userBallot = new hre.ethers.Contract (
            contract_address,
            abi,
            rel_user_wallet
            )
        
            let index = lst_of_args[1]
            let indexed_num = parseInt(index, 10)
            const setTx3 = await rel_userBallot.vote(indexed_num, options)
            await setTx3.wait()
            message.channel.send(`${address} has successfully voted`)
            console.log(setTx3)
        } catch (err) {
            message.member.send('There was an error processing your vote')
            proposals_keys = Object.keys(proposals)
            let limit = proposals_keys.length
            message.member.send(`Make sure you have inputted the right index: 0 <= x < ${limit}`)
        }
        

    } else if (command === 'win') {
        const setTx4 = await headBallot.winnerName()
        winner_hash = setTx4
        if (winner_hash === undefined || null) {
            message.channel.send('There were no votes made')
        } else {
            temp_proposal_keys = Object.keys(temp_proposals)
            let key_idx = 0 
            for (key_idx; key_idx <= temp_proposals_keys.length; key_idx++) {
                key_string = temp_proposal_keys[key_idx]
                value_hash = temp_proposals[key_string]
                if (value_hash === winner_hash) {
                    message.channel.send(`The Winner of the Ballot is; ${key_string}`)
                } 
            }
        }

        proposals = {'prop1':web3.utils.hexToBytes(sha3_prop)}
        message.channel.send('The Proposals have been Re-set')


    } else if (command === 'propose') { // propose 'string'
        lst_of_args = args.slice(1)
        rel_string = lst_of_args[0]
        temp_proposals.push(rel_string)
        message.channel.send(`${rel_string} has been put into consideration for proposals`)

    } else if (command === 'view') {
        message.channel.send('-----------------------------------')
        temp_proposal_keys = Object.keys(temp_proposals)
        if (temp_proposal_keys.length === 0) {
           message.channel.send('There are no Proposals been made yet') 
        } else {
            let key_idx =0 
            for (key_idx; key_idx <= temp_proposals_keys.length; key_idx++) {
                key_string = temp_proposal_keys[key_idx]
                if (key_string === 'prop1') {
                    message.channel.send(`: ${prop1} *Not a legitimate Ballot (only for initialization of the Bot)`)
                } else if (key_string === undefined) {} else {
                    message.channel.send(`: ${key_string}`)
                }
                     
            }
            message.channel.send('-----------------------------------') 
        }

    } else if (command === 'time') { // time 'minutes'
        lst_of_args = args.slice(1)
        time_string = lst_of_args[0]
        minute_int = parseInt(time_string, 10)        // rounded by 10
        seconds = minute_int * 60
        milliseconds = seconds * 1000 
        time = milliseconds
        message.channel.send(`Time for Ballot Creation is Successfully set to: ${time_string} minutes!`)
        

        


    } 





})


client.login('OTc3OTU2OTQ0NDQwNjIzMTU1.Gi73KR.1DQ6M3S8J4hGz0iC_3ub763AfdKnAHmlsVuW_Y')

running()