const { ModalBuilder, TextInputBuilder, ActionRowBuilder, ButtonBuilder } = require("@discordjs/builders");
const {Client, GatewayIntentBits, TextInputStyle, Events, ButtonStyle, REST, Routes, mergeDefault} = require("discord.js");

const client = new Client({intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]})

const rest = new REST({version: "10"}).setToken("MTA1MTU2NzM3MTQ1MTY0MTk4Nw.G7rckY.4Xk-BTq71wYY7qxyhW6pLz1oIWujgt2RSk7nEQ")


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



client.login("MTA1MTU2NzM3MTQ1MTY0MTk4Nw.G7rckY.4Xk-BTq71wYY7qxyhW6pLz1oIWujgt2RSk7nEQ");

cmd().then(res=>{console.log(res)}).catch(e=>{console.log(e)})

console.log(client.servers)