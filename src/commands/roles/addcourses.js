const { SlashCommandBuilder } = require("discord.js");

const utils = require("../../utils")
const mcgill = require("../../services/mcgill_api")

module.exports = {
  data: new SlashCommandBuilder()
    .setName('addcourses')
    .setDescription('Add the following McGill courses to your discord profile.')
    .addSubcommand(sub => sub.setName('CRN')
      .setDescription('Add McGill courses by CRN course number.')
      .addStringOption(option => option
        .setName('CRN(s)')
        .setDescription('CRNs, each CRN separated by a space.')
        .setRequired(true))
      .addStringOption(option => option
        .setName('term')
        .setDescription('(Fall, Winter, or Summer). \n\n Example Format: Fall 2026')
        .setRequired(true)
      ))
    .addSubcommand(sub => sub.setName('Course Code')
      .setDescription('Add McGill courses by course code.')
      .addStringOption(option => option
        .setName('course 1')
        .setDescription('Example Format: \n\n MATH223 \n\n MATH 223')
        .setRequired(true))
      .addStringOption(option => option
        .setName('course 2')
        .setDescription('Example Format: \n\n MATH223 \n\n MATH 223')
        .setRequired(false))
      .addStringOption(option => option
        .setName('course 3')
        .setDescription('Example Format: \n\n MATH223 \n\n MATH 223')
        .setRequired(false))
      .addStringOption(option => option
        .setName('course 4')
        .setDescription('Example Format: \n\n MATH223 \n\n MATH 223')
        .setRequired(false))
      .addStringOption(option => option
        .setName('course 5')
        .setDescription('Example Format: \n\n MATH223 \n\n MATH 223')
        .setRequired(false))
      .addStringOption(option => option
        .setName('course 6')
        .setDescription('Example Format: \n\n MATH223 \n\n MATH 223')
        .setRequired(false))
      .addStringOption(option => option
        .setName('term')
        .setDescription('(Fall, Winter, or Summer). \n\n Example Format: Fall 2026')
        .setRequired(true))
    ),

  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    if (sub == "CRN") {
      const CRNs = interaction.options.getString('CRN(s)');
      const term = interaction.options.getString('term');
      const c = await mcgill.getCourses(utils.splitCRNs(CRNs), term);



    } else if (sub == "Course Code") {

    }
    const member = interaction.options.getMember("user");
    const roles = member.roles.cache
      .filter(role => role.name !== "@everyone" && utils.isCourse(role.name))
      .map(role => role.name);

    await interaction.reply(`:clipboard: **${member.user.displayName}** is taking the following courses: \n\n${roles.join("   \n")}`);
  },
};
