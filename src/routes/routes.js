import { Router } from "express";
import validUrl from "valid-url";
import { nanoid } from "nanoid";

import pool from "../db/db.js";

const router = Router();
const baseUrl = "http://localhost:3000/";

// Base URL
router.get("/", (req, res) => {
  res.status(200).json({ success: true });
});

// Redirect shortened URL to original URL
router.get("/:hash", async (req, res) => {
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
});

// Get all URLs
router.get("/urls", async (req, res) => {
  try {
    pool.query("SELECT * FROM url_table;").then((allUrls) => {
      res.status(200).json(allUrls.rows);
    });
  } catch (err) {
    console.error(err);
  }
});

// Shorten URL
router.post("/url", async (req, res) => {
  try {
    const { actualUrl } = req.body;
    if (!validUrl.isUri(actualUrl)) {
      return res.status(401).json("Invalid URL");
    }
    const shortenedHash = nanoid(10);
    await pool.query("INSERT INTO url_table VALUES ($1, $2);", [
      actualUrl,
      shortenedHash,
    ]);
    res.status(200).json(baseUrl + shortenedHash);
  } catch (err) {
    const duplicateUrl = await pool.query(
      `SELECT shortened_hash FROM url_table where actual_url='${req.body.actualUrl}';`
    );
    res
      .status(500)
      .json(
        `Duplicate URL found, please visit ${
          baseUrl + duplicateUrl.rows[0].shortened_hash
        }`
      );
  }
});

export default router;
