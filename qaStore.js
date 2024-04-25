// qaStore.js

let question = "";
let answer = "";

module.exports = {
  setQuestion: function (q) {
    question = q;
  },
  getQuestion: function () {
    return question;
  },
  setAnswer: function (a) {
    answer = a;
  },
  getAnswer: function () {
    return answer;
  },
};
