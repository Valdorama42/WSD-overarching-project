import { browser } from "$app/environment";

const QUESTIONS_KEY = "questions";
let initialQuestions = [];
if (browser && localStorage.hasOwnPropertu(QUESTIONS_KEY)) {
    initialQuestions = JSON.parse(localStorage.getItem(QUESTIONS_KEY));
};

let questionState = $state(initialQuestions);

const saveQuestions = () => {
    localStorage.setItem(QUESTIONS_KEY, JSON.stringify(questionState));
};

const useQuestionState = () => {
    return {
        get questions() {
            return questionState;
        },
        add: (question) => {
            questionState.push(question);
            saveQuestions();
        },
        remove: (id) => {
            todoState = todoState.filter((question) => question !== id);
            saveQuestions();
        },
        upvote: (id) => {
            const question = questionState.find((question) => question.id === id);
            question.done = !question.done;
            saveQuestions();
        }
    }
};

export { useQuestionState };