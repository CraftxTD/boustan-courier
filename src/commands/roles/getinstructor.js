const { SlashCommandBuilder } = require("discord.js");
const utils = require("../../utils")
const mcgill = require("../../services/mcgill_api")

module.exports = {
  data: new SlashCommandBuilder()
    .setName('getinstructor')
    .setDescription('Get the instructors teaching a course for a given term')
    .addStringOption(option => option
      .setName('term')
      .setDescription('(Fall, Winter, or Summer).\n\n EXAMPLE FORMAT: Fall 2026')
      .setRequired(true))
    .addStringOption(option => option
      .setName('course')
      .setDescription('EXAMPLE FORMAT: \n\n MATH223 \n\n MATH 223')
      .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply();
    const term = utils.capitalizeString(interaction.options.getString('term'));
    const course = utils.formatCourse(interaction.options.getString('course').toUpperCase());
    if (Number.isNaN(parseInt(course.slice(5, 8)))) {
      return await interaction.followUp(utils.returnError(0, course));
    }
    const data = await mcgill.getCourseInfo(course.split(" ").join(""));
    if (!data) {
      return await interaction.followUp(utils.returnError(1, course));
    }
    const instructor = data.course.instructors.find(
      instructor => instructor.term.includes(term)
    );
    if (!instructor) {
      return await interaction.followUp(utils.returnError(3, course, term));
    }

    await interaction.followUp(`
    **${instructor.name}** is the **${course}** instructor for **${term}**.
      `);
  },
};
