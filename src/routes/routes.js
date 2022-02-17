import { Router } from "express";

import redirectToUrl from "../controllers/redirectToUrl.js";
import getAllUrls from "../controllers/getAllUrls.js";
import shortenUrl from "../controllers/shortenUrl.js";

const router = Router();

// Base URL
router.get("/", (req, res) => {
  res.status(200).json({ success: true });
});

// Get all URLs
router.get("/urls", getAllUrls);

// Shorten URL
router.post("/url", shortenUrl);

// Redirect shortened URL to original URL
router.get("/:hash", redirectToUrl);

export default router;
