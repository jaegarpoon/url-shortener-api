import app from "../src/index";
import request from "supertest";

import pool from "../src/db/db";

beforeAll(async () => {
  await pool.query(
    `CREATE TABLE IF NOT EXISTS url_table(
    actual_url VARCHAR PRIMARY KEY,
    shortened_hash VARCHAR(32) UNIQUE NOT NULL
  );`
  );
});

describe("tests /url endpoint", () => {
  it("should create a new shortened url", async () => {
    const res = await request(app).post("/url").send({
      actualUrl: "https://this-is-not-a-real-url.com",
    });
    expect(res.statusCode).toEqual(201);
  });
});

describe("tests /urls endpoint", () => {
  it("should receive all urls in db", async () => {
    const res = await request(app).get("/urls");
    expect(res.statusCode).toEqual(200);
  });
});

afterAll(async () => {
  await pool.query(`DROP TABLE url_table`);
});
