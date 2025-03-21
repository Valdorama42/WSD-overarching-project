
import { PUBLIC_API_URL } from "$env/static/public";

export async function load({ params, fetch }) {
  const { id } = params;
  const courseRes = await fetch(`${PUBLIC_API_URL}/api/courses/${id}`);
  if (!courseRes.ok) {
    throw new Error(`Course ${id} not found`);
  }
  const course = await courseRes.json();
  return { course, courseId: id };
}