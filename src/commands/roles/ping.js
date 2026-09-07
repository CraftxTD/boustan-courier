const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Ping this user.')
    .addUserOption(option => option
      .setName('user')
      .setDescription("The user")
      .setRequired(true)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    await interaction.reply(`Yo someone called ${user.username}`);
  },
};
