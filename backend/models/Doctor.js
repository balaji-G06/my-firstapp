const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  specialities: [
    {
      name: {
        type: String,
        required: true,
      },
    },
  ],
  experience: {
    type: String,
    required: true,
  },
  fees: {
    type: String,
    required: true,
  },
  education: [
    {
      degree: String,
      institution: String,
      year: Number,
    },
  ],
  availability: [
    {
      day: {
        type: String,
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
      },
      slots: [
        {
          startTime: String,
          endTime: String,
          isBooked: {
            type: Boolean,
            default: false,
          },
        },
      ],
    },
  ],
  video_consult: {
    type: Boolean,
    default: false,
  },
  in_clinic: {
    type: Boolean,
    default: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      rating: Number,
      comment: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("Doctor", doctorSchema);
