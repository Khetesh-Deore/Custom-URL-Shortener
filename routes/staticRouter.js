const express = require("express");
const router = express.Router();
const URL = require("../models/url"); // import your model

router.get("/", async (req, res) => {
  try {
    if(!req.user)return res.redirect("/login");
    const allUrls = await URL.find({createdBy:req.user._id}); // get all short URLs from DB
    res.render("ghar", {
      urls: allUrls,
    });
  } catch (err) {
    console.error("Error fetching URLs:", err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/signup",(req,res)=>{
  return res.render("signup");
})

router.get("/login",(req,res)=>{
  return res.render("login");
})

module.exports = router;
