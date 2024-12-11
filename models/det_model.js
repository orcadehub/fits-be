const mongoose = require("mongoose");

const detectionSchema  = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to User
    eegValue: { type: Number, required: true },
    seizureDetected: { type: Boolean, required: true },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Detection", detectionSchema );
