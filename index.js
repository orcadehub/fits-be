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

// Dynamic CORS configuration for local and deployed frontend
const allowedOrigins = [
  "http://localhost:3000",            // Local frontend
  "https://fits-fe-nu.vercel.app",    // Deployed frontend
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Set strictQuery to avoid warnings
mongoose.set("strictQuery", true);

// MongoDB Connection
mongoose
  .connect(MONGO_URI, {
    serverSelectionTimeoutMS: 15000, // 15 seconds
  })
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Basic route to check if server is running
app.get("/", (req, res) => {
  res.send("Server is working - nov-16 4pm");
});

// HTTP Server and Socket.IO Initialization
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  },
});

// Store latest detection data
let latestDetection = {};

// POST API endpoint to receive data from Arduino
app.post("/detected", (req, res) => {
  const { eegValue, seizureDetected } = req.body;

  // Validate incoming data
  if (eegValue === undefined || seizureDetected === undefined) {
    return res.status(400).json({ message: "Invalid data format" });
  }

  // Update latest detection data
  latestDetection = {
    eegValue,
    seizureDetected,
    timestamp: new Date(),
  };

  console.log("Detection Data Received:", latestDetection);

  // Emit data to all connected WebSocket clients
  io.emit("detectionUpdate", latestDetection);

  // Respond to Arduino with success message
  res.status(200).json({
    message: "Data received successfully",
    data: latestDetection,
  });
});

// WebSocket connection event
io.on("connection", (socket) => {
  console.log("New client connected");

  // Send the latest detection data to newly connected clients
  socket.emit("detectionUpdate", latestDetection);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start the server with HTTP and Socket.IO
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
