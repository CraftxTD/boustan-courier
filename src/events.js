const utils = require("./utils")

function greet() {
  let str;
  let sentiment = utils.getRandomInt(1, 10);
  let num;
  switch (sentiment) {
    case 1:
      console.log("Negative");
      num = utils.getRandomInt(0, 1);
      switch (num) {
        case 0:
          str = 'go fuck yourself';
          break;
        case 1:
          str = 'no';
          break;
      }
      break;

    default:
      console.log("Positive");
      num = utils.getRandomInt(0, 9);
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
      break;

  }
  return str;
}

module.exports = {
  greet
};
