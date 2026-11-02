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
    const response = `You did this to yourself`
    const guildMember = interaction.member;
    guildMember
      .timeout(duration * 60 * 1000, response)
      .then(console.log)
      .catch(console.error(`Bot doesn't have permission to timeout user.`));
    await interaction.reply(response)
  },
};
