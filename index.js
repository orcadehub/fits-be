require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const nodemailer = require("nodemailer"); // Import Nodemailer
const Detection = require("./models/det_model");
const User = require("./models/user_model");

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3300;
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.set("strictQuery", true);
mongoose
  .connect(MONGO_URI, {
    serverSelectionTimeoutMS: 15000,
  })
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

require("./models/user_model");
require("./models/det_model");
app.use(require("./routes/user_route"));

// HTTP Server and Socket.IO Initialization
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:3000", "https://fits-fe-nu.vercel.app"],
    methods: ["GET", "POST"],
  },
});

// Mailtrap SMTP Setup (Dummy Email for Testing)
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io", // Mailtrap SMTP server
  port: 587,
  auth: {
    user: "12d4432bf005c4", // Replace with your Mailtrap username
    pass: "7a36ea21b93c71", // Replace with your Mailtrap password
  },
});

// POST /detected - Save Detection for a User
app.post("/detected", async (req, res) => {
  const { email, eegValue, seizureDetected, longitude, latitude } = req.body;

  // Validate request body
  if (!email || eegValue === undefined || seizureDetected === undefined) {
    return res.status(400).json({ message: "Invalid data format" });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Create a new detection record
    const newDetection = new Detection({
      userId: user._id,
      eegValue,
      seizureDetected,
    });
    await newDetection.save();

    // Add detection to user's record
    user.detections.push(newDetection._id);
    await user.save();

    console.log("Detection Data Received:", newDetection);

    // Emit new detection to the user's room
    io.to(user._id.toString()).emit("newDetectionUpdate", newDetection);

    // If seizure is detected, send emails to guardians and user
    if (seizureDetected) {
      const currentLocation =
        longitude && latitude
          ? `Latitude: ${latitude}, Longitude: ${longitude}`
          : "Location not available";

      // Email content
      const emailText = `
        Hello,

        A seizure has been detected for ${user.name}. Here are the details:

        - EEG Value: ${eegValue}
        - Seizure Detected: Yes
        - Current Location: ${currentLocation}

        Immediate attention is required.

        If ${user.name} is in a safe location, please stay calm. We recommend contacting a healthcare provider for further guidance.

        Stay safe,
        The Seizure Detection System
      `;

      // Define recipients (user and guardians)
      const recipients = [user.email, user.guardian1Email, user.guardian2Email];

      // Send email to all recipients
      recipients.forEach((recipient) => {
        const mailOptions = {
          from: "no-reply@dummyemail.com",
          to: recipient,
          subject: "Seizure Detected - Immediate Attention Required",
          text: emailText,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(`Error sending email to ${recipient}:`, error);
          } else {
            console.log(`Email sent to ${recipient}:`, info.response);
          }
        });
      });
    }

    // Response
    res.status(200).json({
      message: "Data received successfully",
      data: newDetection,
    });
  } catch (err) {
    console.error("Error saving detection data:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /detections/:email - Fetch User's Detections
app.get("/detections/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email }).populate("detections");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.detections);
  } catch (err) {
    console.error("Error fetching detections:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// WebSocket Connection
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("joinUserRoom", (email) => {
    socket.join(email);
    console.log(`Client joined room for email: ${email}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("I am Running");
});

// Start the Server
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
