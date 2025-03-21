import { PUBLIC_API_URL } from "$env/static/public";

const BASE_URL = `${PUBLIC_API_URL}/api/courses`;

export async function getCourses() {
  const response = await fetch(BASE_URL);
  return response.json();
}

export async function addCourse(course) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course)
  });
  return response.json();
}