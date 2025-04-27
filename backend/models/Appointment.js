const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  timeSlot: {
    startTime: String,
    endTime: String,
  },
  type: {
    type: String,
    enum: ["video", "in-clinic"],
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled", "completed"],
    default: "pending",
  },
  symptoms: {
    type: String,
  },
  notes: {
    type: String,
  },
  prescription: {
    medicines: [
      {
        name: String,
        dosage: String,
        duration: String,
      },
    ],
    notes: String,
    date: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
