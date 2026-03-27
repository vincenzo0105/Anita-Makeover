const express = require("express");
const router = express.Router();
const multer = require("multer");
const Portfolio = require("../models/Portfolio");

// multer setup
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// GET all images
router.get("/", async (req, res) => {
  const images = await Portfolio.find();
  res.json(images);
});

// POST upload image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const newImage = new Portfolio({
      image: req.file.filename,
    });

    await newImage.save();
    res.json(newImage);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE image
router.delete("/:id", async (req, res) => {
  await Portfolio.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;