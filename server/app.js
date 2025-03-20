import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
import postgres from "postgres";

const sql = postgres();

const app = new Hono();

app.use("/*", cors());
app.use("/*", logger());

app.get("/api/courses", async (c) => {
  const courses = await sql`SELECT id, name FROM courses ORDER BY id`;
  return c.json(courses);
});

app.get("/api/courses/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const courses = await sql`SELECT id, name FROM courses WHERE id = ${id}`;
  return c.json(courses[0]);
});

app.post("/api/courses", async (c) => {
  const { name } = await c.req.json();
  if (!name || name.length < 3) {
    return c.json({ error: "Course name must be at least 3 characters long" }, 400);
  }
  const courses = await sql`
    INSERT INTO courses (name)
    VALUES (${name})
    RETURNING id, name
  `;
  return c.json(courses[0]);
});


app.delete("/api/courses/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const courses = await sql`
    DELETE FROM courses
    WHERE id = ${id}
    RETURNING id, name
  `;
  return c.json(courses[0]);
});

app.get("/api/courses/:id/questions", async (c) => {
  const courseId = Number(c.req.param("id"));
  const questions = await sql`
    SELECT id, title, text, upvotes, course_id
    FROM questions
    WHERE course_id = ${courseId}
    ORDER BY id
  `;
  return c.json(questions);
});

app.post("/api/courses/:id/questions", async (c) => {
  const courseId = Number(c.req.param("id"));
  const { title, text } = await c.req.json();
  if (!title || title.length < 3 || !text || text.length < 3) {
    return c.json({ error: "Question title and text must be at least 3 characters long" }, 400);
  }
  const questions = await sql`
    INSERT INTO questions (course_id, title, text)
    VALUES (${courseId}, ${title}, ${text})
    RETURNING id, title, text, upvotes, course_id
  `;
  return c.json(questions[0]);
});

app.post("/api/courses/:id/questions/:qId/upvote", async (c) => {
  const courseId = Number(c.req.param("id"));
  const qId = Number(c.req.param("qId"));
  const questions = await sql`
    UPDATE questions
    SET upvotes = upvotes + 1
    WHERE id = ${qId} AND course_id = ${courseId}
    RETURNING id, title, text, upvotes, course_id
  `;
  return c.json(questions[0]);
});

app.delete("/api/courses/:id/questions/:qId", async (c) => {
  const courseId = Number(c.req.param("id"));
  const qId = Number(c.req.param("qId"));
  const questions = await sql`
    DELETE FROM questions
    WHERE id = ${qId} AND course_id = ${courseId}
    RETURNING id, title, text, upvotes, course_id
  `;
  return c.json(questions[0]);
});

export default app;