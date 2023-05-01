import syllabusJson from './syllabusJson.js';
import fs from 'fs';

let syllabus = {};
let topics = syllabusJson.topics;
let board, grade, subject;
for (let topic of topics) {
  let {name, hierarchy} = topic;
  let topicStructure = {};
  topicStructure = {
      summary: '',
      suggestedQuestions: []
  };
  if (hierarchy.length >= 4) {
    board = hierarchy[0];
    if (board === "CBSE" || board === "Common Core SS" || board === "Test (Common Core)" || board === "Test") {
      grade = hierarchy[1];
      subject = hierarchy[2];
    } else if (board === "English") {
      board = "CBSE";
      grade = "Class 11 & 12";
      subject = "English";
    } else {
      continue;
    }
  } else {
    subject = hierarchy[0].trim();
    board = "CBSE";
    grade = "Class 11 & 12";
  }
  if (syllabus[board] === undefined) {
    syllabus[board] = {}
  }
  if (syllabus[board][grade] === undefined) {
    syllabus[board][grade] = {};
  }
  if (syllabus[board][grade][subject] === undefined) {
    syllabus[board][grade][subject] = {};
  }
  syllabus[board][grade][subject][name] = topicStructure;
}
fs.writeFile("./syllabus/syllabus.json", JSON.stringify(syllabus, null, 4), (err) => {
  if (err) {  console.error(err);  return; };
  console.log("File has been created");
});

export default syllabus;
