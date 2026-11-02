const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('timeout')
    .setDescription('Timeout yourself for a specific duration')
    .addNumberOption((duration) =>
      duration
        .setName('duration')
        .setDescription('Duration of timeout in minutes')
        .setRequired(true),
    ),
  async execute(interaction) {
    const duration = interaction.options.getNumber('duration');
    const guildMember = interaction.member;
    guildMember
      .timeout(duration * 60 * 1000, 'You did this to yourself')
      .then(console.log)
      .catch(console.error);
  },
};
