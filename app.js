const { ModalBuilder, TextInputBuilder, ActionRowBuilder, ButtonBuilder } = require("@discordjs/builders");
const {Client, GatewayIntentBits, TextInputStyle, Events, ButtonStyle, REST, Routes, mergeDefault} = require("discord.js");
const http = require("http")
const app = require("express")();
require("dotenv").config()

const { InteractionType, InteractionResponseType, verifyKeyMiddleware } = require('discord-interactions');


app.listen(8999, ()=>{
    console.log("Server running")
})


const client = new Client({intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
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


client.on(Events.InteractionCreate, async interaction=>{
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

        modal.addComponents(ar);

        await interaction.showModal(modal);
        
        client.on("interactionCreate", async interaction=>{
            if(!interaction.isModalSubmit()) return;

            const algo_input = interaction.fields.getTextInputValue("alg_input")
            
            let repl;

            if(algo_input=="for"){
                repl = `
                for(int i=0; i<n; i++){
                    //Codigo
                }`

                interaction.reply({content: repl})
            }else if(algo_input=="if"){
                repl = `
                    if(condicion){
                        //Codigo
                    }
                `

                interaction.reply({content: repl})
            }else if(algo_input=="while"){
                repl = `
                    while(condicion){
                        //Codigo
                    }
                `

                interaction.reply({content: repl})
            }

            
        })

    }
})



client.login(process.env.TOKEN);


cmd().then(res=>{console.log(res)}).catch(e=>{console.log(e)})

app.post("/interactions", (req, res)=>{
    res.send({
        // https://discord.com/developers/docs/interactions/receiving-and-responding#responding-to-an-interaction
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data:{
          content:'👍'
        }
      });
})

