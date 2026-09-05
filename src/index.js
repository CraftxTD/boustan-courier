require('dotenv').config();
const utils = require("./utils")
const commands = require("./commands")
const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on('ready', (c) => {
  console.log(`${c.user.username} is online.`);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) {
    return;
  }

  // greet if called
  if (utils.toLowerCase(message.content) === 'courier') {
    let num = utils.getRandomInt(0, 9);
    console.log("Called:", num);
    message.reply(commands.greet());
  }
});

client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'test') {
    interaction.reply('test');
  }
});


client.login(process.env.DISCORD_TOKEN);
