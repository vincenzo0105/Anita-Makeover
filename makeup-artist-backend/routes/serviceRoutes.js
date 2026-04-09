console.log("Service routes loaded with Cloudinary");

const express = require("express");
const router = express.Router();
const Service = require("../models/Service");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// 📦 Cloudinary Storage Configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "anitas-makeover/services",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 800, height: 600, crop: "limit" }]
  }
});

const upload = multer({ storage });


// ✅ CREATE Service
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const newService = new Service({
      ...req.body,
      image: req.file ? req.file.path : ""
    });

    const saved = await newService.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ✅ GET All Services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ✅ UPDATE Service
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const existingService = await Service.findById(req.params.id);

    const updateData = {
      ...req.body
    };

    // If a new image is uploaded
    if (req.file) {
      updateData.image = req.file.path;

      // Delete old image from Cloudinary
      if (existingService && existingService.image) {
        const publicId = existingService.image
          .split("/")
          .slice(-2)
          .join("/")
          .split(".")[0];

        await cloudinary.uploader.destroy(publicId);
      }
    }

    const updated = await Service.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ✅ DELETE Service
router.delete("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    // Delete image from Cloudinary
    if (service && service.image) {
      const publicId = service.image
        .split("/")
        .slice(-2)
        .join("/")
        .split(".")[0];

      await cloudinary.uploader.destroy(publicId);
    }

    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;