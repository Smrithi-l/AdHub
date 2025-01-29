const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const Ad = require("../models/Ad");

const router = express.Router();

router.post("/save", verifyToken, async (req, res) => {
  try {
    const { title, description, niche, image, priceRange, audience } = req.body;

    const newAd = new Ad({
      userId: req.userId, // Add user ID from token
      title,
      description,
      niche,
      image,
      priceRange,
      audience,
    });

    const savedAd = await newAd.save();
    res.status(201).json({ message: "Ad created successfully!", ad: savedAd });
  } catch (err) {
    console.error("Error creating ad:", err);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

module.exports = router;
