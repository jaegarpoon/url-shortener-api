import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import pool from "./db/db.js";
import router from "./routes/routes.js";

const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
  })
);

// Initialise API by creating url_table if it does not exist
const url_shortener_init = async () => {
  try {
    await pool.connect();
    pool.query(`CREATE TABLE IF NOT EXISTS url_table(
      actual_url VARCHAR(128) PRIMARY KEY,
      shortened_hash VARCHAR(32) UNIQUE NOT NULL
    );`);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
url_shortener_init().then((result) => {
  if (result) {
    console.log("Initialised");
  }
});

app.use("/", router);
app.use("/url", router);
app.use("/urls", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
