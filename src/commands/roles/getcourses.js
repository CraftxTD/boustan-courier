const { SlashCommandBuilder } = require("discord.js");
const utils = require("../../utils")

module.exports = {
  data: new SlashCommandBuilder()
    .setName('getcourses')
    .setDescription('Display the courses of a McGill student')
    .addUserOption(option => option
      .setName('user')
      .setDescription("McGill student")
      .setRequired(true)
    ),

  async execute(interaction) {
    const member = interaction.options.getMember("user");
    const roles = member.roles.cache
      .filter(role => role.name !== "@everyone" && utils.isCourse(role.name))
      .map(role => role.name);

    await interaction.reply(`:clipboard: **${member.user.displayName}** is taking the following courses: \n\n${roles.join("   \n")}`);
  },
};
