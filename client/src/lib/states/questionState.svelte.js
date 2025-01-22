import { browser } from "$app/environment";

const QUESTIONS_KEY = "questions";
let initialQuestions = [];
if (browser && localStorage.hasOwnProperty(QUESTIONS_KEY)) {
  initialQuestions = JSON.parse(localStorage.getItem(QUESTIONS_KEY));
}

let questionState = $state(initialQuestions);

const saveQuestions = () => {
  localStorage.setItem(QUESTIONS_KEY, JSON.stringify(questionState));
};

const useQState = () => {
  return {
    get questions() {
      return questionState;
    },
    add: (q) => {
      questionState.push(q);
      saveQuestions();
    },
    changeDone: (id) => {
      const q = questionState.find((q) => q.id === id);
      q.done = !q.done;
      saveQuestions();
    },
    remove: (id) => {
      questionState = questionState.filter((q) => q.id !== id);
      saveQuestions();
    },
    upVote: (id) => {
      const q = questionState.find((q) => q.id === id);
      if (q) {
        q.count += 1;
        saveQuestions;
      };
    },
  };
};

export { useQState };