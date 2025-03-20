import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
import * as courseRepository from "./repositories/courseRepository.js";
import * as questionsRepository from "./repositories/questionsRepository.js";

const app = new Hono();

app.use("/*", cors());
app.use("/*", logger());

app.get("/api/courses", async (c) => {
  const courses = await courseRepository.getAllCourses();
  return c.json({ courses });
});

app.get("/api/courses/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const course = await courseRepository.getCourseById(id);
  return c.json({ course });
});

app.post("/api/courses", async (c) => {
  const name = await c.req.json();
  if (!name || name.length < 3) {
    return c.json({ error: "Course name must be at least 3 characters long" }, 400);
  }
  const course = await courseRepository.createCourse(name);
  return c.json({ course });
});

app.delete("/api/courses/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const course = await courseRepository.deleteCourse(id);
  return c.json({ course });
});

app.get("/api/courses/:id/questions", async (c) => {
  const courseId = Number(c.req.param("id"));
  const questions = await questionsRepository.getQuestionsForCourse(courseId);
  return c.json({ questions });
});

app.post("/api/courses/:id/questions", async (c) => {
  const courseId = Number(c.req.param("id"));
  const { title, text } = await c.req.json();
  if (!title || title.length < 3 || !text || text.length < 3) {
    return c.json({ error: "Question title and text must be at least 3 characters long" }, 400);
  }
  const question = await questionsRepository.createQuestion(courseId, title, text);
  return c.json(question);
});

app.post("/api/courses/:id/questions/:qId/upvote", async (c) => {
  const courseId = Number(c.req.param("id"));
  const qId = Number(c.req.param("qId"));
  const question = await questionsRepository.upvoteQuestion(courseId, qId);
  return c.json(question);
});

app.delete("/api/courses/:id/questions/:qId", (c) => {
  const courseId = Number(c.req.param("id"));
  const qId = Number(c.req.param("qId"));
  const removed = questionsRepository.deleteQuestion(courseId, qId);
  return c.json(removed);
});

export default app;