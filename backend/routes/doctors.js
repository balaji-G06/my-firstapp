const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");
const auth = require("../middleware/auth");

// Get all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("user", ["name", "email"]);
    res.json(doctors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get doctor by ID
router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate("user", [
      "name",
      "email",
    ]);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json(doctor);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(500).send("Server Error");
  }
});

// Create or update doctor profile
router.post("/", auth, async (req, res) => {
  const {
    specialities,
    experience,
    fees,
    education,
    availability,
    video_consult,
    in_clinic,
  } = req.body;

  try {
    let doctor = await Doctor.findOne({ user: req.user.id });

    if (doctor) {
      // Update
      doctor = await Doctor.findOneAndUpdate(
        { user: req.user.id },
        {
          $set: {
            specialities,
            experience,
            fees,
            education,
            availability,
            video_consult,
            in_clinic,
          },
        },
        { new: true }
      );
    } else {
      // Create
      doctor = new Doctor({
        user: req.user.id,
        specialities,
        experience,
        fees,
        education,
        availability,
        video_consult,
        in_clinic,
      });
      await doctor.save();
    }
    res.json(doctor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
