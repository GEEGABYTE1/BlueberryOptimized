const hre = require('hardhat')
var Web3 = require('web3')
var web3 = new Web3(Web3.givenProvider || process.env.API_URL)

const Discord = require('discord.js')
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });


const prefix = '-'


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
                message.channel.send('You have signed in')
                message.delete()
                message.member.send('**Note**: to send votes, it is needed that you put in your private_key')
                message.member.send('BlueBerry or its developers will never use or even access private_keys at all.')
                
               
                message.member.roles.add('978003617363681440')
                message.channel.send(`${message.author.username} will become ${address}`)
                message.author.username = String(address)
                console.log(message.author.username)
                private_address = lst_of_args[1]
                wallets[String(address)] = private_address
                
            } else {
              message.member.send(`Your wallet: ${address} was invalid!`)
            }
        }
    }
})


client.login('OTc3OTU2OTQ0NDQwNjIzMTU1.Gi73KR.1DQ6M3S8J4hGz0iC_3ub763AfdKnAHmlsVuW_Y')

running()