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
});


module.exports = mongoose.model("User", userSchema);
