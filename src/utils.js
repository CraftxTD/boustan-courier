// @ts-check

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function toLowerCase(str) {
  return str.toLowerCase();
}

/**
  * @param {string} word 
  * @param {string} text 
  */
function findString(text, word) {
  text = text.toLowerCase();
  for (let i = 0; i < text.length; i++) {
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

  if (subject == "COMP"
    || subject == "MATH"
    || subject == "BIOL"
    || subject == "CHEM"
    || subject == "PSYC"
    || subject == "ECON"
    || subject == "PHYS"
    || subject == "ATOC") {
    return true;
  }
  return false;
}

module.exports = {
  getRandomInt,
  toLowerCase,
  findString,
  isCourse
};
