const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const auth = require("../middleware/auth");

// Get all appointments for a user (patient or doctor)
router.get("/", auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({
      $or: [{ patient: req.user.id }, { doctor: req.user.id }],
    })
      .populate("doctor", ["name", "specialities"])
      .populate("patient", ["name"]);

    res.json(appointments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Create new appointment
router.post("/", auth, async (req, res) => {
  try {
    const { doctorId, date, timeSlot, type, symptoms } = req.body;

    const newAppointment = new Appointment({
      doctor: doctorId,
      patient: req.user.id,
      date,
      timeSlot,
      type,
      symptoms,
    });

    const appointment = await newAppointment.save();
    res.json(appointment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update appointment status
router.put("/:id", auth, async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Verify user is either the doctor or patient
    if (
      appointment.doctor.toString() !== req.user.id &&
      appointment.patient.toString() !== req.user.id
    ) {
      return res.status(401).json({ message: "Not authorized" });
    }

    appointment.status = status;
    await appointment.save();
    res.json(appointment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Add prescription to appointment
router.put("/:id/prescription", auth, async (req, res) => {
  try {
    const { medicines, notes } = req.body;
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Verify user is the doctor
    if (appointment.doctor.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    appointment.prescription = {
      medicines,
      notes,
      date: Date.now(),
    };

    await appointment.save();
    res.json(appointment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
