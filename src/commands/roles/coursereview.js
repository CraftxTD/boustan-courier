const { SlashCommandBuilder } = require("discord.js");
const utils = require("../../utils")
const mcgill = require("../../services/mcgill_api")

module.exports = {
  data: new SlashCommandBuilder()
    .setName('coursereview')
    .setDescription('Get a random course review for a given course')
    .addStringOption(option => option
      .setName('course')
      .setDescription('EXAMPLE FORMAT: \n\n MATH223 \n\n MATH 223')
      .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply();
    const course = utils.formatCourse(interaction.options.getString('course').toUpperCase());
    if (Number.isNaN(parseInt(course.slice(5, 8)))) {
      return await interaction.followUp(utils.returnError(0, course));
    }
    const data = await mcgill.getCourseReviews(course.split(" ").join(""));
    if (!data) {
      return await interaction.followUp(utils.returnError(1, course));

    } else if (data.reviews.length === 0) {
      return await interaction.followUp(utils.returnError(2, course));
    }
    let random = utils.getRandomInt(0, data.reviews.length - 1);
    let randReview = data.reviews[random];
    console.log(randReview);

    await interaction.followUp(`
    :white_check_mark: Here's a random course review for **${course}**:
      \n:teacher: **Instructors**: ${randReview.instructors.join(", ")}
      \n:clipboard: **Review**:\n${randReview.content}
      \n:fire: **Difficulty**: ${randReview.difficulty}
      \n:star: **Rating**: ${randReview.rating}
      \n:thumbsup: **Likes**: ${randReview.likes}
      `);
  },
};
