const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isNewUser: { type: Boolean, default: true },

  items: {
    food: [
      {
        breakfast: { type: String },
        lunch: { type: String },
        dinner: { type: String },
      },
    ],
    exercise: [
      {
        morning: { type: String },
        evening: { type: String },
      },
    ],
  },

  completedDays: { type: [Number], default: [] },
  scheduleAdherence: { type: Number, default: 0 },

  // Guardian emails
  guardian1Email: { type: String, required: true },
  guardian2Email: { type: String, required: true },

  // New Field: Store references to detection records
  detections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Detection" }],
});

module.exports = mongoose.model("User", userSchema);
