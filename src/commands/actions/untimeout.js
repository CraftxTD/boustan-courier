const { SlashCommandBuilder, GuildMemberEditOptions } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('untimeout')
    .setDescription('Remove timeout from someone else')
    .addUserOption(option =>
      option
        .setName('target')
        .setDescription('User to un-timeout')
        .setRequired(true),
    ),
  async execute(interaction) {
    const target = interaction.options.getMember('target');
    const editOptions = {
      communicationDisabledUntil: null,
    };
    const isTimedOut = (target.communicationDisabledUntil != null);
    if (!isTimedOut) {
      await interaction.reply(`This user does not have a timeout.`);
      return;
    }
    try {
      target.edit(editOptions);
    } catch (error) {
      await interaction.reply(`This user does not have a timeout.`);
    }
    await interaction.reply(`Removed ${target.displayName}'s timeout`)
  },
};
