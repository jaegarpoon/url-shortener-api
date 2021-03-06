import validUrl from "valid-url";
import { nanoid } from "nanoid";

import pool from "../db/db.js";

const shortenUrl = async (req, res) => {
  const baseUrl = req.protocol + "://" + req.get("host");
  try {
    const { actualUrl } = req.body;
    if (!validUrl.isUri(actualUrl)) {
      return res
        .status(500)
        .json({ body: "Invalid URL. Try adding http:// or https://" });
    }
    const shortenedHash = nanoid(10);
    await pool.query("INSERT INTO url_table VALUES ($1, $2);", [
      actualUrl,
      shortenedHash,
    ]);
    res
      .status(201)
      .json({ body: "Built! Visit   ", url: baseUrl + "/" + shortenedHash });
  } catch (err) {
    const duplicateUrl = await pool.query(
      `SELECT shortened_hash FROM url_table where actual_url='${req.body.actualUrl}';`
    );
    res.status(500).json({
      body: "Duplicate URL found, please visit   ",
      url: baseUrl + "/" + duplicateUrl.rows[0].shortened_hash,
    });
  }
};

export default shortenUrl;
