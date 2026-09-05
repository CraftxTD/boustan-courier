const utils = require("./utils")

function greet() {
  let str;
  let num = utils.getRandomInt(0, 9);
  console.log("Called:", num);
  switch (num) {
    case 0:
      str = 'wassup';
      break;
    case 1:
      str = 'yo';
      break;
    case 2:
      str = 'how ya doin';
      break;
    case 3:
      str = 'hello';
      break;
    case 4:
      str = 'yeah';
      break;
    case 5:
      str = 'lol';
      break;
    case 6:
      str = 'nice weather today huh';
      break;
    case 7:
      str = 'hi';
      break;
    case 8:
      str = 'good day';
      break;
    case 9:
      str = 'what';
      break;
  }
  return str;
}

module.exports = {
  greet
};
