const { ModalBuilder, TextInputBuilder, ActionRowBuilder, ButtonBuilder } = require("@discordjs/builders");
const {Client, GatewayIntentBits, TextInputStyle, Events, ButtonStyle, REST, Routes, mergeDefault} = require("discord.js");

const client = new Client({intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]})

const rest = new REST({version: "10"}).setToken("MTA1MTU2NzM3MTQ1MTY0MTk4Nw.GOSdey.4u0o_hDT2t27wDpjjqgXw-vPeWSawJnEwCSw5M")


async function cmd(){
    await rest.put(Routes.applicationGuildCommands("1051567371451641987", "1051689202439430156"), {
        body: [
            {
                name : "algo",
                description: "Pregunta por un algoritmo"
            }
        ]
    })
}



client.login("MTA1MTU2NzM3MTQ1MTY0MTk4Nw.GOSdey.4u0o_hDT2t27wDpjjqgXw-vPeWSawJnEwCSw5M");

cmd().then(res=>{console.log(res)}).catch(e=>{console.log(e)})

console.log(client.servers)