const { ModalBuilder, TextInputBuilder, ActionRowBuilder, ButtonBuilder } = require("@discordjs/builders");
const {Client, GatewayIntentBits, TextInputStyle, Events, ButtonStyle, REST, Routes, mergeDefault} = require("discord.js");
const http = require("http")
require("dotenv").config()


const client = new Client({intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]})

const rest = new REST({version: "10"}).setToken(process.env.TOKEN)


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


client.on("ready", ()=>{
    console.log("Ready to work")
})

client.on("interactionCreate", async interaction=>{
    if(interaction.isChatInputCommand()){
        console.log("Interactions Working");

        const modal = new ModalBuilder()
                          .setCustomId("modal")
                          .setTitle("Que algoritmo deseas?")
                          
        const txt = new TextInputBuilder()
                        .setLabel("Pregunta por un algoritmo")
                        .setCustomId("alg_input")
                        .setPlaceholder("Ejemplo: Segment Tree")
                        .setStyle(TextInputStyle.Short)

        const ar = new ActionRowBuilder().setComponents(txt);

        modal.addComponents(txt);

        await interaction.showModal(modal);
        /*
        client.on("interactionCreate", async interaction=>{
            if(!interaction.isModalSubmit()) return;

            const algo_input = interaction.
        })*/

    }
})



client.login(process.env.TOKEN);


cmd().then(res=>{console.log(res)}).catch(e=>{console.log(e)})

