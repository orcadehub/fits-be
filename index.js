require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
// const User = mongoose.model("User");
const Detection =require("./models/det_model");
const User =require("./models/user_model");

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

// POST /detected - Save Detection for a User
app.post("/detected", async (req, res) => {
  const { userId, eegValue, seizureDetected } = req.body;

  if (!userId || eegValue === undefined || seizureDetected === undefined) {
    return res.status(400).json({ message: "Invalid data format" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newDetection = new Detection({ userId, eegValue, seizureDetected });
    await newDetection.save();

    user.detections.push(newDetection._id);
    await user.save();

    console.log("Detection Data Received:", newDetection);

    // Emit new detection to the user's room
    io.to(userId).emit("newDetectionUpdate", newDetection);

    res.status(200).json({ message: "Data received successfully", data: newDetection });
  } catch (err) {
    console.error("Error saving detection data:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /detections/:userId - Fetch User's Detections
app.get("/detections/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("detections");
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

  socket.on("joinUserRoom", (userId) => {
    socket.join(userId);
    console.log(`Client joined room for userId: ${userId}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start the Server
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});