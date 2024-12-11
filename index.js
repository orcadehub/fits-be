const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const fs = require("fs");

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3300;
const app = express();

app.use(cors());
// JSON middleware for Express
app.use(express.json());

// Set strictQuery to avoid warnings
mongoose.set("strictQuery", true);

// MongoDB Connection
mongoose
  .connect(MONGO_URI, {
    serverSelectionTimeoutMS: 15000, // 15 seconds
  })
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Include models and routes
require("./models/user_model");
// require("./models/product_model");
app.use(require("./routes/user_route"));
// app.use(require("./routes/user_related_route"));
// app.use(require("./routes/product_route"));

// Basic route to check if server is running
app.get("/", (req, res) => {
  res.send("Server is working nov-16 4pm");
});

// Start Express server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
  



const assign=async ()=> {
  const randomNumber = Math.floor(Math.random() * 4999) + 1;
  const plansData = JSON.parse(fs.readFileSync("user7DayPlans.json", "utf-8"))
  console.log(plansData[randomNumber].plan);
  return plansData[randomNumber].plan;
}
const foodAndExercisePlan = assign();

app.post("/assign-plan", async (req, res) => {
  console.log("reached");
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    // Fetch the user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Prepare the food and exercise plan
    const plan = foodAndExercisePlan.map((day, index) => ({
      day: index + 1,
      food: day.food,
      exercise: day.exercise,
    }));

    // Update user's items in database
    user.items.food = plan.map((p) => p.food);
    user.items.exercise = plan.map((p) => p.exercise);

    // Update user's `isNew` to false (onboarding completed)
    user.isNewUser = false;

    await user.save();

    return res
      .status(200)
      .json({ message: "Plan assigned successfully", items: user.items });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});