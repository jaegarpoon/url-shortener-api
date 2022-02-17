import pool from "../db/db.js";

const getAllUrls = async (req, res) => {
  try {
    pool.query("SELECT * FROM url_table;").then((allUrls) => {
      res.status(200).json(allUrls.rows);
    });
  } catch (err) {
    console.error(err);
  }
};

export default getAllUrls;
