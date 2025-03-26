import { Hono } from "@hono/hono";
import { getCookie, setCookie } from "jsr:@hono/hono@4.6.5/cookie";
import { cors } from "@hono/hono/cors";
import { hash, verify } from "jsr:@denorg/scrypt@4.4.4";
import * as jwt from "jsr:@hono/hono@4.6.5/jwt";
import { logger } from "@hono/hono/logger";
import postgres from "postgres";

const sql = postgres();

const COOKIE_KEY = "token";
const JWT_SECRET = "wsd-project-secret";

const app = new Hono();

app.use("/*", logger());

app.use(
  "/*",
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const userMiddleware = async (c, next) => {
  const token = getCookie(c, COOKIE_KEY);
  const { payload } = jwt.decode(token, JWT_SECRET);
  c.user = payload;
  await next();
};

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

const clean = (data) => {
  data.email = data.email.trim().toLowerCase();
  data.password = data.password.trim();
};

app.post("/api/auth/register", async (c) => {
  const data = await c.req.json();
  clean(data);

  const result = await sql`INSERT INTO users (email, password_hash)
    VALUES (${data.email}, ${hash(data.password)}) RETURNING *`;

  return c.json(result[0]);
});

app.post("/api/auth/login", async (c) => {
  const data = await c.req.json();
  clean(data);

  const result = await sql`SELECT * FROM users
    WHERE email = ${data.email}`;

  if (result.length === 0) {
    return c.json({ message: "Incorrect email or password." });
  }

  const user = result[0];

  const passwordValid = verify(data.password, user.password_hash);
  if (passwordValid) {
    const payload = { email: user.email };
    const token = await jwt.sign(payload, JWT_SECRET);

    setCookie(c, COOKIE_KEY, token, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      sameSite: "lax",
    });
    return c.json({ message: "Welcome!" });
  } else {
    return c.json({ message: "Incorrect email or password." });
  }
});

app.get("/api/courses/:id/questions/:qId", async (c) => {
  const qId = Number(c.req.param("qId"));
  const courseId = Number(c.req.param("id"));
  const questions = await sql`
    SELECT id, title, text, upvotes, course_id
    FROM questions
    WHERE course_id = ${qId} AND id = ${courseId}
  `;
  return c.json(questions[0]);
});

app.get("/api/courses/:id/questions/:qId/answers", async (c) => {
  const qId = Number(c.req.param("qId"));
  const answers = await sql`
    SELECT id, question_id, upvotes, text
    FROM question_answers
    WHERE question_id = ${qId}
    ORDER BY id
  `;
  return c.json(answers);
});

app.use(
  "/api/courses/:id/questions/:qId/answers",
  jwt.jwt({
    cookie: COOKIE_KEY,
    secret: JWT_SECRET,
  }),
);

app.use("/api/courses/:id/questions/:qId/answers", userMiddleware);

app.post("/api/courses/:id/questions/:qId/answers", async (c) => {
  const qId = Number(c.req.param("qId"));
  const { text } = await c.req.json();
  if (!text || text.length < 3) {
    return c.json({ error: "Answer text must be at least 3 characters long" }, 400);
  }

  // Retrieve user identifier from the database using the email in the token
  const userResult = await sql`SELECT id FROM users WHERE email = ${c.user.email}`;
  if (userResult.length === 0) {
    return c.json({ error: "User not found" }, 401);
  }
  const userId = userResult[0].id;

  // Insert the answer into the database
  const answers = await sql`
    INSERT INTO question_answers (question_id, user_id, text)
    VALUES (${qId}, ${userId}, ${text})
    RETURNING id, user_id, text, upvotes, question_id
  `;
  return c.json(answers[0]);
});

app.use(
  "/api/courses/:id/questions/:qId/answers/:aId/upvote",
  jwt.jwt({
    cookie: COOKIE_KEY,
    secret: JWT_SECRET,
  }),
);

app.use("/api/courses/:id/questions/:qId/answers/:aId/upvote", userMiddleware);

app.post("/api/courses/:id/questions/:qId/answers/:aId/upvote", async (c) => {
  const qId = Number(c.req.param("qId"));
  const aId = Number(c.req.param("aId"));

  // Ensure the user is authenticated
  if (!c.user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const answers = await sql`
    UPDATE question_answers
    SET upvotes = upvotes + 1
    WHERE id = ${aId} AND question_id = ${qId}
    RETURNING id, user_id, text, upvotes, question_id
  `;
  return c.json(answers[0]);
});

export default app;