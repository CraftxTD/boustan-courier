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
        .setName('term')
        .setDescription('(Fall, Winter, or Summer).\n\n EXAMPLE FORMAT: Fall 2026')
        .setRequired(true))
      .addStringOption(option => option
        .setName('crn-s')
        .setDescription('CRNs, each CRN separated by a space.')
        .setRequired(true))
    )
    .addSubcommand(sub => sub.setName('course_code')
      .setDescription('Add McGill courses by course code.')
      .addStringOption(option => option
        .setName('term')
        .setDescription('(Fall, Winter, or Summer).\n\n EXAMPLE FORMAT: Fall 2026')
        .setRequired(true))
      .addStringOption(option => option
        .setName('course_1')
        .setDescription('EXAMPLE FORMAT: \n\n MATH223 \n\n MATH 223')
        .setRequired(true))
      .addStringOption(option => option
        .setName('course_2')
        .setDescription('EXAMPLE FORMAT: \n\n MATH223 \n\n MATH 223')
        .setRequired(false))
      .addStringOption(option => option
        .setName('course_3')
        .setDescription('EXAMPLE FORMAT: \n\n MATH223 \n\n MATH 223')
        .setRequired(false))
      .addStringOption(option => option
        .setName('course_4')
        .setDescription('EXAMPLE FORMAT: \n\n MATH223 \n\n MATH 223')
        .setRequired(false))
      .addStringOption(option => option
        .setName('course_5')
        .setDescription('EXAMPLE FORMAT: \n\n MATH223 \n\n MATH 223')
        .setRequired(false))
      .addStringOption(option => option
        .setName('course_6')
        .setDescription('EXAMPLE FORMAT: \n\n MATH223 \n\n MATH 223')
        .setRequired(false))
    ),

  async execute(interaction) {
    await interaction.deferReply();
    const sub = interaction.options.getSubcommand();
    const term = interaction.options.getString('term');
    const addedcourses = [];
    if (sub == "crn") {
      console.log("chose crn");
      const CRNs = interaction.options.getString('crn-s');
      console.log(CRNs);
      const data = await mcgill.getCourses(interaction, utils.splitCRNs(CRNs), term);
      console.log("got courses");
      for (const course of data) {
        let role = await utils.createCourseRole(interaction, utils.formatCourse(course));
        if (role) {
          addedcourses.push(role);
        }
      }
    } else if (sub == "course_code") {
      console.log("chose course code");
      const courses = [
        interaction.options.getString('course_1'),
        interaction.options.getString('course_2'),
        interaction.options.getString('course_3'),
        interaction.options.getString('course_4'),
        interaction.options.getString('course_5'),
      ]
      for (let course of courses) {
        console.log(course);
        let role;
        if (course) {
          formattedCourse = utils.formatCourse(course);
          console.log(parseInt(formattedCourse.slice(5, 8)));
          if (Number.isNaN(parseInt(formattedCourse.slice(5, 8)))) {
            await interaction.followUp(`ERROR: ${course} is an invalid course format... Skipping..`);
            continue;
          }
          let data = await mcgill.getCourseInfo(`${formattedCourse.slice(0, 4)}${formattedCourse.slice(5, 8)}`)
          if (!data) {
            await interaction.followUp(`ERROR: ${course} doesn't exist... Skipping..`);
            continue;
          }
          const hasTerm = data.course.schedule.find(
            schedule => schedule.term === term
          );
          if (hasTerm) {
            role = await utils.createCourseRole(interaction, formattedCourse);
            if (role) {
              addedcourses.push(role);
            }
          } else {
            await interaction.followUp(`WARNING: Skipping ${formattedCourse}. This course is not being offered for ${term}.\n\n`);
          }
        }
      }

    }
    const member = interaction.member;
    for (const course of addedcourses) {
      console.log(course.name);
      member.roles.add(course.id);
    }

    if (addedcourses.length === 0) {
      await interaction.followUp(`:clipboard: No courses added to **${member.user.displayName}.`);
    } else {
      await interaction.followUp(`:clipboard: Added the following roles to **${member.user.displayName}**: \n\n${addedcourses.map(course => course.name).join("   \n")}`);
    }
  },
};
