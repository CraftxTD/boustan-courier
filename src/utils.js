const chroma = require("chroma-js");

const { SlashCommandBuilder } = require("discord.js");

// @ts-check

/**
 * #f20c0c Red
 * #f26f0c Orange
 * #f2d10c Yellow
 * #b3f20c Yellow-green
 * #51f20c Green
 * #0cf22b Green
 * #0cf28e Spring green
 * #0cf2f0 Cyan
 * #0c8ef2 Light blue
 * #0c2bf2 Blue
 * #510cf2 Violet
 * #b30cf2 Purple
 * #f20cd1 Magenta
 * #f20c6f Pink
 * #f20c89 Pink-red
 * #f20c3d Red-pink
*/
const COURSES = Object.freeze({
  COMP: { id: "COMP", color: "#f20c0c" },
  BIOL: { id: "BIOL", color: "#f26f0c" },
  MATH: { id: "MATH", color: "#f2d10c" },
  PHYS: { id: "PHYS", color: "#b3f20c" },
  LING: { id: "LING", color: "#51f20c" },
  CHEM: { id: "CHEM", color: "#0cf22b" },
  PSYC: { id: "PSYC", color: "#0cf28e" },
  ATOC: { id: "ATOC", color: "#0cf2f0" },
  PHGY: { id: "PHGY", color: "#0c8ef2" },
  NEUR: { id: "NEUR", color: "#0c2bf2" },
  ANAT: { id: "ANAT", color: "#510cf2" },
  ECON: { id: "ECON", color: "#b30cf2" },
  ISLA: { id: "ISLA", color: "#f20cd1" },
  FREN: { id: "FREN", color: "#f20c6f" },
  ANTH: { id: "ANTH", color: "#f20c0c" },
  GEOG: { id: "GEOG", color: "#f20c89" },
})

/**
  * @param {number} error 
  * @param {string} course 
  * @param {string} term 
  */
function returnError(error, course, term) {
  let output;
  switch (error) {
    case 0:
      output = `:x: **${course}** is an invalid course format.`;
      break;
    case 1:
      output = `:x: **${course}** does not exist.`;
      break;
    case 2:
      output = `:x: **${course}** does not have any reviews.`;
      break;
    case 3:
      output = `:x: **${course}** isn't being offered for **${term}**`;
      break;
  }
  return output;
}


/**
  * @param {number} min 
  * @param {number} max 
  */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
  * @param {string} str 
  */
function toLowerCase(str) {
  return str.toLowerCase();
}

/**
  * @param {string} word 
  * @param {string} text 
  * @param {number} limit 
  */
function findString(text, word, limit) {
  text = text.toLowerCase();
  let length = Math.min(limit, text.length);
  for (let i = 0; i < length; i++) {
    if (word.startsWith(text[i])) {
      i++;
      for (let j = 1; j < word.length; j++, i++) {
        if (word[j] != text[i]) {
          break;
        } else if (j == word.length - 1) {
          return true;
        }
      }
    }
  }
  return false;
}

/**
  * @param {string} role 
  */
function isCourse(role) {
  let subject = "";
  for (let i = 0; i < 4; i++) {
    if (role[i] < 'A' || role[i] > 'Z') {
      return false;
    } else if (role[i] == ' ') {
      break;
    }
    subject += role[i];
  }
  if (subject.length < 4) return false;

  for (const course of Object.values(COURSES)) {
    if (course.id == subject) return true;
  }

  return false;
}

/**
  * @param {string} CRNs
  */
function splitCRNs(CRNs) {
  const arr = CRNs.split(/\s+/);
  let arr2 = [];
  CRN:
  for (let CRN of arr) {
    if (CRN[0] === '(') {
      continue;
    }
    for (const c of CRN) {
      if (c < '0' || '9' < c) {
        continue CRN;
      }
    }
    arr2.push(CRN);
  }
  return arr2;
}

/**
  * @param {string} course
  */
function addSpace(course) {
  return course.slice(0, 4) + ' ' + course.slice(4)
}

/**
  * @param {string} course
  */
function formatCourse(courseID) {
  let arr = courseID.split(/\s+/);
  if (arr.length < 2) {
    return `${courseID.slice(0, 4)} ${courseID.slice(4, 7)}`;
  }
  return `${arr[0]} ${arr[1]}`;
}

/**
  * Create the corresponding course role if it doesn't exist yet. 
  * Course includes a space inbetween course key and course id
  * @param {string} course
  */
async function createCourseRole(interaction, courseID) {
  let course = interaction.guild.roles.cache.find(
    role => role.name === courseID
  );
  console.log(course);
  if (course) return course;
  let subject = courseID.slice(0, 4);
  let id = parseInt(courseID.slice(5, 8));

  let color;
  for (const course of Object.values(COURSES)) {
    if (course.id == subject) {
      if (id < 100) {
        await interaction.followUp(`ERROR: ${courseID} is not a course.`)
        break;
      }
      let normal = -3 + 6 * (((id / 100) - 1) / 7);
      color = normal < 0 ? chroma(course.color).darken(normal).hex() : chroma(course.color).brighten(normal).hex();
      break;
    }
  }
  if (!color) {
    return;
  }

  return await interaction.guild.roles.create({
    name: `${subject} ${id}`,
    colors: {
      primaryColor: color
    }
  });
}

/**
  * Capitalize the start of every word in any given string.
  * @param {string} phrase 
  */
function capitalizeString(phrase) {
  phrase = phrase.toLowerCase();
  let output = "";
  for (let i = 0; i < phrase.length; i++) {
    if (/^[a-z]$/.test(phrase[i])) {
      output += i - 1 >= 0 && phrase[i - 1] === " " || i === 0 ? phrase[i].toUpperCase() : phrase[i];
    } else {
      output += phrase[i];
    }
  }
  return output;
}


/**
  * @param {any} msgAttach 
  */
function attachIsImage(msgAttach) {
}




module.exports = {
  getRandomInt,
  toLowerCase,
  findString, isCourse,
  splitCRNs,
  addSpace,
  formatCourse,
  createCourseRole,
  capitalizeString,
  returnError
};
