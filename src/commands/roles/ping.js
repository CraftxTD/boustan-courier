const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Pong!')
    .addUserOption(option => option
      .setName('user')
      .setDescription('Ping this user')
      .setRequired(true)
    ),

  async execute(interaction) {
    const user = interaction.option.user;
    await interaction.reply(`Yo someone called ${user}`);
  },
};
