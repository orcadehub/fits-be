require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

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

// Define Detection Model
const detectionSchema = new mongoose.Schema({
  eegValue: { type: Number, required: true }, // Accepts integers and floats
  seizureDetected: { type: Boolean, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Detection = mongoose.model("Detection", detectionSchema);

// HTTP Server and Socket.IO Initialization
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:3000", "https://fits-fe-nu.vercel.app"],
    methods: ["GET", "POST"],
  },
});

// POST API to Save Detection Data
app.post("/detected", async (req, res) => {
  const { eegValue, seizureDetected } = req.body;

  if (eegValue === undefined || seizureDetected === undefined) {
    return res.status(400).json({ message: "Invalid data format" });
  }

  try {
    const newDetection = new Detection({ eegValue, seizureDetected });
    await newDetection.save();

    console.log("Detection Data Received:", newDetection);

    // Emit the latest data to all connected clients
    io.emit("newDetectionUpdate", newDetection);

    res
      .status(200)
      .json({ message: "Data received successfully", data: newDetection });
  } catch (err) {
    console.error("Error saving detection data:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET API to Fetch Recent Detections
app.get("/detections", async (req, res) => {
  try {
    const detections = await Detection.find()
      .sort({ timestamp: -1 })
      .limit(100); // Get the latest 100 records
    res.status(200).json(detections);
  } catch (err) {
    console.error("Error fetching detections:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// WebSocket Connection
io.on("connection", (socket) => {
  console.log("New client connected");

  // Send the latest 100 detections on connection
  Detection.find()
    .sort({ timestamp: -1 })
    .limit(100)
    .then((detections) => {
      socket.emit("initialDetections", detections);
    });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start the Server
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
