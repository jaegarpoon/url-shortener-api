import pool from "../db/db.js";

const getAllUrls = async (req, res) => {
  try {
    const baseUrl = req.protocol + "://" + req.get("host");
    pool.query("SELECT * FROM url_table;").then((urlTable) => {
      const allUrls = urlTable.rows.map((element) => {
        return {
          actualUrl: element.actual_url,
          shortenedUrl: baseUrl + "/" + element.shortened_hash,
        };
      });
      res.status(200).json(allUrls);
    });
  } catch (err) {
    console.error(err);
  }
};

export default getAllUrls;
