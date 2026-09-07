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

  if (subject == "COMP"
    || subject == "MATH"
    || subject == "BIOL"
    || subject == "PHYS"
    || subject == "LING"
    || subject == "CHEM"
    || subject == "PSYC"
    || subject == "ATOC") {
    return true;
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
function removeSpace(course) {
  return course.split(' ').join('');
}

/**
  * @param {string} course
  */
function addSpace(course) {
  return course.slice(0, 4) + ' ' + course.slice(4)
}



module.exports = {
  getRandomInt,
  toLowerCase,
  findString,
  isCourse,
  splitCRNs,
  removeSpace,
  addSpace
};
