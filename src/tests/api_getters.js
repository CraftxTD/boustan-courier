const utils = require("../utils");

// @ts-check

const mcgill = require("../services/mcgill_api");

async function test_getCourseInfo() {
  const c = await mcgill.getCourseInfo("COMP202");
  console.log(c);
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
  const c = await mcgill.getCourses(utils.splitCRNs(CRNs), "Winter 2027");
  if (c) {
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
  const c = await mcgill.checkCourse(course, term);
  console.log(c);

}

console.log("Starting testing..")
// test_getCourseInfo()
// test_getCourse();
// test_getCourses();
test_checkCourse();
