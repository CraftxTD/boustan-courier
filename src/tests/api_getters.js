const utils = require("../utils");

// @ts-check

const mcgill = require("../services/mcgill_api");

function testCapitalize() {
  console.log(utils.capitalizeString("slkdfjslkdjf"));
  console.log(utils.capitalizeString("fall 2026"));
  console.log(utils.capitalizeString("to be or not to be"));
  console.log(utils.capitalizeString("proFessor MAx"));
  console.log(utils.capitalizeString("SDFLKAJ aSDFlkj bbsdrfSERF 20234"));
}

async function test_getCourseInfo() {
  const c = await mcgill.getCourseInfo("ISLA423D2");
  console.log(c.course.schedule);
}

async function test_getCourse() {
  console.time("getCourse");
  const c = await mcgill.getCourse("1899", "Winter 2027");
  if (c) {
    console.log(c);
  }
  console.timeEnd("getCourse");
}

async function test_getCourses() {
  console.time("getCourses");
  let CRNs = "1899 1788 1814 1820 1289 1968 4545";
  const c = await mcgill.getCourses(utils.splitCRNs(CRNs), "Fall 2026");
  if (c) {
    console.log(`CRNs: ${c}`);
    for (let i = 0; i < c.length; i++) {
      c[i] = utils.addSpace(c[i]);
    }
    console.log(c);
  }
  console.timeEnd("getCourses");
}

async function test_checkCourse() {
  let course = "COMP206";
  let term = "Fall 2026";
  const c = await mcgill.checkCourse(
    course => course.split(' ').join(''),
    term);
  console.log(c);

}

console.log("Starting testing..")

// Util tests
// testCapitalize();


// API tests
// test_getCourseInfo();
// test_getCourse();
// test_checkCourse();
test_getCourses();

