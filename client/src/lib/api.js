import { PUBLIC_API_URL } from "$env/static/public";

const COURSE_ID = 1;
const BASE_URL = `${PUBLIC_API_URL}/courses/${COURSE_ID}/questions`;

export async function getQuestions() {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch questions");
  }
  return response.json();
}

export async function addQuestion(question) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(question)
  });
  if (!response.ok) {
    throw new Error("Failed to add question");
  }
  return response.json();
}

export async function upvoteQuestion(qId) {
  const response = await fetch(`${BASE_URL}/${qId}/upvote`, {
    method: "POST"
  });
  if (!response.ok) {
    throw new Error("Failed to upvote question");
  }
  return response.json();
}

export async function deleteQuestion(qId) {
  const response = await fetch(`${BASE_URL}/${qId}`, {
    method: "DELETE"
  });
  if (!response.ok) {
    throw new Error("Failed to delete question");
  }
  return response.json();
}
