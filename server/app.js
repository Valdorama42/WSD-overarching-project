import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
import postgres from "postgres";

const app = new Hono();
const sql = postgres();

app.use("/*", cors());
app.use("/*", logger());

app.get("/courses", (c) => {
  return c.json( {"courses": [ 
    {"id": 1, "name": "Web Software Development" }, 
    {"id": 2, "name": "Device-Agnostic Design" } 
  ], 
});
});

app.get("/courses/:id", (c) => {
  const id = Number(c.req.param("id"));
  return c.json ( {"course": { id , "name": "Course Name" } } );
});

app.post("/courses", async (c) => {
  const request = await c.req.json();
  const name = request.name
  return c.json( {"course": { "id": 3, name}} );
});

let questions = [];

app.get("/courses/:id/questions", (c) => {
  return c.json(questions);
});

app.post("/courses/:id/questions", async (c) => {
  const body = await c.req.json();
  const id = questions.length + 1;
  const question = { id, body, upvotes: 0 };
  questions.push(question);
  return c.json(question);
});

app.post("/courses:id/questions/:qId/upvote", (c) => {
  const qId = Number(c.req.param("qId"));
  const question = questions.find((q) => q.id === qId);
  question.upvotes++;
  return c.json(questions);
});

app.delete("/courses:id/questions/:qId", (c) => {
  const qId = Number(c.req.param("qId"));
  questions = questions.filter((q) => q.id !== qId);
  return c.json(questions);
});

export default app;