function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function toLowerCase(str: string): string {
  return str.toLowerCase();
}

function findString(word: string, str: string): boolean {

}

module.exports = {
  getRandomInt,
  toLowerCase
};
