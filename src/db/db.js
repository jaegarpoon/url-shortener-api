import * as pg from "pg";

const { Pool } = pg.default;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "url_shortener",
  port: 5432,
});

export default pool;
