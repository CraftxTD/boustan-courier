const utils = require("../utils.js");

// @ts-check

const BASE = "https://mcgill.courses/api";

/**
  * @param {string} courseID 
  */
async function getCourseInfo(courseID) {
  const response = await fetch(`${BASE}/courses/${courseID}`);
  const data = await response.json();
  return data;
}

/**
  * @param {string} CRN 
  * @param {string} term 
  */
async function getCourse(CRN, term) {
  const response = await fetch(`${BASE}/courses?
    query=${CRN}&
    terms=${term}`);
  const data = await response.json();
  for (const course of data.courses) {
    const hasTerm = course.schedule.find(
      schedule => schedule.term === term
    );
    if (hasTerm) {
      const hasCRN = hasTerm.blocks.find(
        block => block.crn === CRN
      );
      if (hasCRN) return course._id;
    }
  }
  return;
}

/**
  * @param {Array} CRNs 
  * @param {string} term 
  */
async function getCourses(CRNs, term) {
  if (!CRNs) {
    return;
  }
  const response = await fetch(`${BASE}/courses?
    terms=${term}`);
  const data = await response.json();
  let arr = [];
  for (const course of data.courses) {
    const hasTerm = course.schedule.find(
      schedule => schedule.term === term
    );
    if (hasTerm) {
      for (let i = 0; i < CRNs.length; i++) {
        const hasCRN = hasTerm.blocks.find(
          block => block.crn === CRNs[i]
        );
        if (hasCRN) {
          CRNs[i] = CRNs[CRNs.length - 1];
          CRNs.pop();
          arr.push(course._id);
        }
      }
    }
  }
  return arr;
}

/**
  * @param {(unconcatenated: string) => string} course 
  * @param {string} term 
  */
async function checkCourse(course, term) {
  const data = await getCourseInfo(course);
  if (data) {
    const termExists = data.course.terms.includes(term);
    if (termExists) return true;
  }
  return false;
}


module.exports = {
  getCourseInfo,
  getCourse,
  getCourses,
  checkCourse
}

