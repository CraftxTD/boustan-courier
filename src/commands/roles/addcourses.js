const { SlashCommandBuilder } = require("discord.js");

const utils = require("../../utils")
const mcgill = require("../../services/mcgill_api")

module.exports = {
  data: new SlashCommandBuilder()
    .setName('addcourses')
    .setDescription('Add the following McGill courses to your discord profile.')
    .addSubcommand(sub => sub.setName('crn')
      .setDescription('Add McGill courses by CRN course number.')
      .addStringOption(option => option
        .setName('crn-s')
        .setDescription('CRNs, each CRN separated by a space.')
        .setRequired(true))
      .addStringOption(option => option
        .setName('term')
        .setDescription('(Fall, Winter, or Summer). \n\n Example Format: Fall 2026')
        .setRequired(true)
      ))
    .addSubcommand(sub => sub.setName('course_code')
      .setDescription('Add McGill courses by course code.')
      .addStringOption(option => option
        .setName('course_1')
        .setDescription('Example Format: \n\n MATH223 \n\n MATH 223')
        .setRequired(true))
      .addStringOption(option => option
        .setName('course_2')
        .setDescription('Example Format: \n\n MATH223 \n\n MATH 223')
        .setRequired(false))
      .addStringOption(option => option
        .setName('course_3')
        .setDescription('Example Format: \n\n MATH223 \n\n MATH 223')
        .setRequired(false))
      .addStringOption(option => option
        .setName('course_4')
        .setDescription('Example Format: \n\n MATH223 \n\n MATH 223')
        .setRequired(false))
      .addStringOption(option => option
        .setName('course_5')
        .setDescription('Example Format: \n\n MATH223 \n\n MATH 223')
        .setRequired(false))
      .addStringOption(option => option
        .setName('course_6')
        .setDescription('Example Format: \n\n MATH223 \n\n MATH 223')
        .setRequired(false))
      .addStringOption(option => option
        .setName('term')
        .setDescription('(Fall, Winter, or Summer). \n\n Example Format: Fall 2026')
        .setRequired(true))
    ),

  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    const addedcourses = [];
    if (sub == "crn") {
      const CRNs = interaction.options.getString('crn-s');
      const term = interaction.options.getString('term');
      const data = await mcgill.getCourses(utils.splitCRNs(CRNs), term);
      for (const course of data) {
        let role = utils.createCourseRole(course);
        if (role) addedcourses.push(role.id);
      }
    } else if (sub == "course_code") {
      const courses = [
        interaction.options.getString('course_1'),
        interaction.options.getString('course_2'),
        interaction.options.getString('course_3'),
        interaction.options.getString('course_4'),
        interaction.options.getString('course_5'),
      ]
      for (const course of courses) {
        let role;
        if (course) {
          role = utils.createCourseRole(course);
          if (role) addedcourses.push(role.id);
        }
      }

    }
    const member = interaction.options.getMember("user");
    if (addedcourses.length === 0) {
      await interaction.reply(`:clipboard: No courses added to **${member.user.displayName}.`);
    } else {
      await interaction.reply(`:clipboard: Added the following roles to **${member.user.displayName}**: \n\n${addedcourses.join("   \n")}`);
    }
  },
};
