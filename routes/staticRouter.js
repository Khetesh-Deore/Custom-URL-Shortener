const express = require("express");
const router = express.Router();
const URL = require("../models/url"); // import your model

router.get("/", async (req, res) => {
  try {
    const allUrls = await URL.find({}); // get all short URLs from DB
    res.render("ghar", {
      urls: allUrls,
    });
  } catch (err) {
    console.error("Error fetching URLs:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
