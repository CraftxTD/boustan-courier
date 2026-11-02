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
    const target = interaction.options.getUser('target').member;
    const editOptions = {
      communicationDisabledUntil: null,
    };
    target.edit(editOptions);
  },
};
