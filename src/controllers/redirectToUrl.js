import pool from "../db/db.js";

const redirectToUrl = async (req, res) => {
  try {
    const actualUrl = await pool.query(
      `SELECT actual_url FROM url_table WHERE shortened_hash='${req.params.hash}'`
    );
    if (actualUrl) {
      res.redirect(actualUrl.rows[0].actual_url);
    } else {
      res.status(404).json("URL not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Error occurred in the server");
  }
};

export default redirectToUrl;
