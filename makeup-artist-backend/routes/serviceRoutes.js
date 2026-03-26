console.log("Service routes loaded");

const express = require("express");
const router = express.Router();
const Service = require("../models/Service");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });


router.post("/", upload.single("image"), async (req, res) => {
  try {
    const newService = new Service({
      ...req.body,
      image: req.file ? req.file.filename : ""
    });

    const saved = await newService.save();
    res.json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ✅ GET all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ✅ UPDATE service
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      ...req.body
    };

    if (req.file) {
      updateData.image = req.file.filename;
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


// ✅ DELETE service (NEW)
router.delete("/:id", async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;