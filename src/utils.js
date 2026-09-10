const chroma = require("chroma-js");

const { SlashCommandBuilder } = require("discord.js");

// @ts-check

/**
  * #f20c0c (Red)
  * #f2890c (Orange)
  * #ddf20c (Yellow-Green)
  * #60f20c (Green)
  * #0cf236 (Mint Green)
  * #0cf2b3 (Teal/Cyan)
  * #0cb3f2 (Sky Blue)
  * #0c36f2 (Royal Blue)
  * #600cf2 (Violet/Indigo)
  * #dd0cf2 (Magenta)
  * #f20c89 (Hot Pink)
  */

const COURSES = Object.freeze({
  COMP: { id: "COMP", color: "#f20c0c" },
  BIOL: { id: "BIOL", color: "#f2890c" },
  MATH: { id: "MATH", color: "#ddf20c" },
  PHYS: { id: "PHYS", color: "#60f20c" },
  LING: { id: "LING", color: "#0cf236" },
  CHEM: { id: "CHEM", color: "#0cf2b3" },
  PSYC: { id: "PSYC", color: "#0cb3f2" },
  ATOC: { id: "ATOC", color: "#0c36f2" },
  PHGY: { id: "PHGY", color: "#600cf2" },
  NEUR: { id: "NEUR", color: "#dd0cf2" },
  ANAT: { id: "ANAT", color: "#f20c89" },
})

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
  const arr = CRNs.split(" ");
  for (let CRN of arr) {
    for (let c of CRN) {
      if (c < '0' || '9' < c) {
        return;
      }
    }
  }
  return arr;
}

/**
  * @param {string} course
  */
function addSpace(course) {
  return course.slice(0, 4) + ' ' + course.slice(4)
}

/**
  * Create the corresponding course role if it doesn't exist yet. 
  * Course includes a space inbetween course key and course id
  * @param {string} course
  */
async function createCourseRole(courseID) {
  let course = message.guild.roles.cache.find(x => x.name === courseID);
  if (!(typeof course === undefined)) return false;
  let subject = courseID.slice(0, 4);
  let id = parseInt(courseID);
  let color;
  for (const course of Object.values(COURSES)) {
    if (course.id == subject) {
      let normal = -3 + 6 * (((id / 100) - 1) / 7);
      color = normal < 0 ? chroma(course.color).darken(normal) : chroma(course.color).brighten(normal);
      break;
    }
  }
  if (!color) return false;

  return await guild.roles.create({
    name: `${subject} ${toString(id)}`,
    color: `${color}`
  });
}

module.exports = {
  getRandomInt,
  toLowerCase,
  findString, isCourse,
  splitCRNs,
  addSpace,
  createCourseRole
};
