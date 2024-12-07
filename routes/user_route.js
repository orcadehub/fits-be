const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");

// Secret Key for JWT
const JWT_SECRET = "your_super_secret_key"; // Change this to a secure key.

const foodAndExercisePlan = [
  // Day 1
  {
    food: {
      breakfast: "Oatmeal with fruits",
      lunch: "Grilled chicken with salad",
      dinner: "Steamed vegetables with brown rice",
    },
    exercise: {
      morning: "15-minute jogging",
      evening: "30-minute yoga session",
    },
  },
  // Day 2
  {
    food: {
      breakfast: "Smoothie with spinach and banana",
      lunch: "Quinoa with grilled fish",
      dinner: "Chicken soup with steamed broccoli",
    },
    exercise: {
      morning: "20 push-ups and planks",
      evening: "Cycling for 20 minutes",
    },
  },
  // Day 3
  {
    food: {
      breakfast: "Boiled eggs with whole-grain toast",
      lunch: "Grilled turkey wrap with veggies",
      dinner: "Baked salmon with asparagus",
    },
    exercise: {
      morning: "10-minute brisk walking",
      evening: "45-minute pilates session",
    },
  },
  // Day 4
  {
    food: {
      breakfast: "Greek yogurt with nuts and honey",
      lunch: "Brown rice with sautéed tofu and vegetables",
      dinner: "Lentil soup with spinach and whole-grain bread",
    },
    exercise: {
      morning: "30 squats and lunges",
      evening: "30-minute swimming",
    },
  },
  // Day 5
  {
    food: {
      breakfast: "Chia pudding with berries",
      lunch: "Grilled chicken with sweet potato and green beans",
      dinner: "Stir-fried shrimp with quinoa and veggies",
    },
    exercise: {
      morning: "20-minute skipping rope",
      evening: "40-minute strength training",
    },
  },
  // Day 6
  {
    food: {
      breakfast: "Banana pancakes with almond butter",
      lunch: "Whole-wheat pasta with tomato and spinach sauce",
      dinner: "Stuffed bell peppers with black beans and rice",
    },
    exercise: {
      morning: "20 push-ups and 30 sit-ups",
      evening: "25-minute meditation and stretching",
    },
  },
  // Day 7
  {
    food: {
      breakfast: "Avocado toast with poached eggs",
      lunch: "Grilled fish tacos with cabbage slaw",
      dinner: "Chicken stew with root vegetables",
    },
    exercise: {
      morning: "15-minute walk with light stretches",
      evening: "40-minute dancing or Zumba session",
    },
  },
];

// ---------------- SIGNUP ROUTE ----------------
router.post("/signup", async (req, res) => {
  console.log(req.body);
  const { name, email, phone, password, confirmPassword } = req.body;

  // Client-Side Validation Check
  if (!name || !email || !phone || !password || !confirmPassword) {
    return res.status(400).json({ error: "Please fill all fields" });
  }

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ error: "Passwords do not match from backend" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email or phone already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// ---------------- LOGIN ROUTE ----------------
router.post("/login", async (req, res) => {
  const { emailOrPhone, password } = req.body;

  if (!emailOrPhone || !password) {
    return res
      .status(400)
      .json({ error: "Please provide email/phone and password" });
  }

  try {
    // Find user by email or phone
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, JWT_SECRET);

    // Exclude password field before sending user details
    const { password: _, ...userDetails } = user.toObject();
    // user.isNew = false;
    // await user.save();
    res.status(200).json({
      message: "Login successful",
      token,
      user: userDetails,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to assign food and exercise plan
router.post("/assign-plan", async (req, res) => {
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
    user.isNew = false;

    await user.save();

    return res
      .status(200)
      .json({ message: "Plan assigned successfully", items: user.items });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Assuming you're using Express.js

// Route to fetch user's details and food/exercise plan
router.post("/user-details", async (req, res) => {
  const { userId } = req.body; // Get the user ID from the session or JWT token
  console.log(userId)
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { name, email, phone, items } = user;
    const foodAndExercise = items.food.map((day, index) => ({
      day: index + 1,
      breakfast: day.breakfast,
      lunch: day.lunch,
      dinner: day.dinner,
      morningExercise: items.exercise[index]?.morning,
      eveningExercise: items.exercise[index]?.evening,
    }));

    res.json({ name, email, phone, foodAndExercise });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
