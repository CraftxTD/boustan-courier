const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hi')
    .setDescription('Says hello'),

  async execute(interaction) {
    await interaction.reply('Hello!');
  },
};
