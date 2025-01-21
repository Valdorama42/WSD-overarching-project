import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
import postgres from "postgres";

const app = new Hono();
const sql = postgres();

app.use("/*", cors());
app.use("/*", logger());

app.get("/courses", (c) => {
  return c.json( {"courses": [ {"id": 1, "name": "Web Software Development" }, {"id": 2, "name": "Device-Agnostic Design" } ] })
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

app.get("/courses/:id/topics", (c) => {
  return c.json( {"topics": [ {"id": 1, "name": "Topic 1" }, {"id": 2, "name": "Topic 2" } ] });
});

app.get("/courses/:cId/topics/:tId/posts", (c) => {
  return c.json( {"posts": [ {"id": 1, "title": "Post 1" }, {"id": 2, "title": "Post 2" } ] });
});

app.get("/courses/:cId/topics/:tId/posts/:pId", (c) => {
  const pId = Number(c.req.param("pId"));
  return c.json( {"post": { "id": pId, "title": "Post Title" }, "answers": [{"id":1, "content": "Answer 1"}, {"id": 2, "content": "Answer 2"}]} );
});
export default app;