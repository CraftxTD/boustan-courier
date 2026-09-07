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

module.exports = {
  getRandomInt,
  toLowerCase,
  findString
};
