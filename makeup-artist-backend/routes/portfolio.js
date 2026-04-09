console.log("Portfolio routes loaded with Cloudinary");

const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const Portfolio = require("../models/Portfolio");

// 📦 Cloudinary Storage Configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "anitas-makeover/portfolio",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [
      { width: 800, height: 800, crop: "limit" }
    ],
  },
});

const upload = multer({ storage });


// ✅ GET all portfolio images
router.get("/", async (req, res) => {
  try {
    const images = await Portfolio.find().sort({ _id: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ POST upload image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const newImage = new Portfolio({
      image: req.file.path, // Cloudinary URL
      public_id: req.file.filename, // Used for deletion
    });

    await newImage.save();
    res.status(201).json(newImage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ DELETE image (from Cloudinary + MongoDB)
router.delete("/:id", async (req, res) => {
  try {
    const image = await Portfolio.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Delete from Cloudinary
    if (image.public_id) {
      await cloudinary.uploader.destroy(image.public_id);
    }

    // Delete from MongoDB
    await Portfolio.findByIdAndDelete(req.params.id);

    res.json({ message: "Image deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;