import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
import postgres from "postgres";

const app = new Hono();
const sql = postgres();

app.use("/*", cors());
app.use("/*", logger());

let questions = [];

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


export default app;