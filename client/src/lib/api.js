import { PUBLIC_API_URL } from "$env/static/public";

export async function getQuestions(courseId) {
  const response = await fetch(`${PUBLIC_API_URL}/api/courses/${courseId}/questions`);
  return response.json();
}

export async function addQuestion(courseId, question) {
  const response = await fetch(`${PUBLIC_API_URL}/api/courses/${courseId}/questions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(question)
  });
  return response.json();
}

export async function upvoteQuestion(courseId, qId) {
  const response = await fetch(`${PUBLIC_API_URL}/api/courses/${courseId}/questions/${qId}/upvote`, {
    method: "POST"
  });
  return response.json();
}

export async function deleteQuestion(courseId, qId) {
  const response = await fetch(`${PUBLIC_API_URL}/api/courses/${courseId}/questions/${qId}`, {
    method: "DELETE"
  });
  return response.json();
}