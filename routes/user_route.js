const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
// const fs = require("fs");
// const axios = require("axios");
const { faker } = require("@faker-js/faker");
// const plansData = JSON.parse(fs.readFileSync("user7DayPlans.json", "utf-8"));
// Function to generate a 7-day personalized food and exercise plan
const generatePersonalizedPlan = () => {
  const plan = [
    {
      food: {
        breakfast: faker.helpers.arrayElement([
          "Oatmeal with fruits",
          "Smoothie with spinach and banana",
          "Boiled eggs with whole-grain toast",
          "Greek yogurt with nuts and honey",
          "Chia pudding with berries",
          "Avocado toast with poached eggs",
          "Banana pancakes with almond butter",
        ]),
        lunch: faker.helpers.arrayElement([
          "Grilled chicken with salad",
          "Quinoa with grilled fish",
          "Grilled turkey wrap with veggies",
          "Brown rice with sautéed tofu and vegetables",
          "Grilled chicken with sweet potato and green beans",
          "Whole-wheat pasta with tomato sauce",
        ]),
        dinner: faker.helpers.arrayElement([
          "Steamed vegetables with brown rice",
          "Chicken soup with steamed broccoli",
          "Baked salmon with asparagus",
          "Lentil soup with spinach",
          "Stuffed bell peppers with black beans and rice",
          "Stir-fried shrimp with quinoa and veggies",
        ]),
      },
      exercise: {
        morning: faker.helpers.arrayElement([
          "15-minute jogging",
          "20 push-ups and planks",
          "10-minute brisk walking",
          "30 squats and lunges",
          "20-minute skipping rope",
          "15-minute yoga session",
        ]),
        evening: faker.helpers.arrayElement([
          "30-minute yoga session",
          "Cycling for 20 minutes",
          "45-minute pilates session",
          "40-minute strength training",
          "25-minute meditation",
          "40-minute dancing or Zumba session",
        ]),
      },
    },
    {
      food: {
        breakfast: faker.helpers.arrayElement([
          "Oatmeal with fruits",
          "Smoothie with spinach and banana",
          "Boiled eggs with whole-grain toast",
          "Greek yogurt with nuts and honey",
          "Chia pudding with berries",
          "Avocado toast with poached eggs",
          "Banana pancakes with almond butter",
        ]),
        lunch: faker.helpers.arrayElement([
          "Grilled chicken with salad",
          "Quinoa with grilled fish",
          "Grilled turkey wrap with veggies",
          "Brown rice with sautéed tofu and vegetables",
          "Grilled chicken with sweet potato and green beans",
          "Whole-wheat pasta with tomato sauce",
        ]),
        dinner: faker.helpers.arrayElement([
          "Steamed vegetables with brown rice",
          "Chicken soup with steamed broccoli",
          "Baked salmon with asparagus",
          "Lentil soup with spinach",
          "Stuffed bell peppers with black beans and rice",
          "Stir-fried shrimp with quinoa and veggies",
        ]),
      },
      exercise: {
        morning: faker.helpers.arrayElement([
          "15-minute jogging",
          "20 push-ups and planks",
          "10-minute brisk walking",
          "30 squats and lunges",
          "20-minute skipping rope",
          "15-minute yoga session",
        ]),
        evening: faker.helpers.arrayElement([
          "30-minute yoga session",
          "Cycling for 20 minutes",
          "45-minute pilates session",
          "40-minute strength training",
          "25-minute meditation",
          "40-minute dancing or Zumba session",
        ]),
      },
    },
    {
      food: {
        breakfast: faker.helpers.arrayElement([
          "Oatmeal with fruits",
          "Smoothie with spinach and banana",
          "Boiled eggs with whole-grain toast",
          "Greek yogurt with nuts and honey",
          "Chia pudding with berries",
          "Avocado toast with poached eggs",
          "Banana pancakes with almond butter",
        ]),
        lunch: faker.helpers.arrayElement([
          "Grilled chicken with salad",
          "Quinoa with grilled fish",
          "Grilled turkey wrap with veggies",
          "Brown rice with sautéed tofu and vegetables",
          "Grilled chicken with sweet potato and green beans",
          "Whole-wheat pasta with tomato sauce",
        ]),
        dinner: faker.helpers.arrayElement([
          "Steamed vegetables with brown rice",
          "Chicken soup with steamed broccoli",
          "Baked salmon with asparagus",
          "Lentil soup with spinach",
          "Stuffed bell peppers with black beans and rice",
          "Stir-fried shrimp with quinoa and veggies",
        ]),
      },
      exercise: {
        morning: faker.helpers.arrayElement([
          "15-minute jogging",
          "20 push-ups and planks",
          "10-minute brisk walking",
          "30 squats and lunges",
          "20-minute skipping rope",
          "15-minute yoga session",
        ]),
        evening: faker.helpers.arrayElement([
          "30-minute yoga session",
          "Cycling for 20 minutes",
          "45-minute pilates session",
          "40-minute strength training",
          "25-minute meditation",
          "40-minute dancing or Zumba session",
        ]),
      },
    },
    {
      food: {
        breakfast: faker.helpers.arrayElement([
          "Oatmeal with fruits",
          "Smoothie with spinach and banana",
          "Boiled eggs with whole-grain toast",
          "Greek yogurt with nuts and honey",
          "Chia pudding with berries",
          "Avocado toast with poached eggs",
          "Banana pancakes with almond butter",
        ]),
        lunch: faker.helpers.arrayElement([
          "Grilled chicken with salad",
          "Quinoa with grilled fish",
          "Grilled turkey wrap with veggies",
          "Brown rice with sautéed tofu and vegetables",
          "Grilled chicken with sweet potato and green beans",
          "Whole-wheat pasta with tomato sauce",
        ]),
        dinner: faker.helpers.arrayElement([
          "Steamed vegetables with brown rice",
          "Chicken soup with steamed broccoli",
          "Baked salmon with asparagus",
          "Lentil soup with spinach",
          "Stuffed bell peppers with black beans and rice",
          "Stir-fried shrimp with quinoa and veggies",
        ]),
      },
      exercise: {
        morning: faker.helpers.arrayElement([
          "15-minute jogging",
          "20 push-ups and planks",
          "10-minute brisk walking",
          "30 squats and lunges",
          "20-minute skipping rope",
          "15-minute yoga session",
        ]),
        evening: faker.helpers.arrayElement([
          "30-minute yoga session",
          "Cycling for 20 minutes",
          "45-minute pilates session",
          "40-minute strength training",
          "25-minute meditation",
          "40-minute dancing or Zumba session",
        ]),
      },
    },
    {
      food: {
        breakfast: faker.helpers.arrayElement([
          "Oatmeal with fruits",
          "Smoothie with spinach and banana",
          "Boiled eggs with whole-grain toast",
          "Greek yogurt with nuts and honey",
          "Chia pudding with berries",
          "Avocado toast with poached eggs",
          "Banana pancakes with almond butter",
        ]),
        lunch: faker.helpers.arrayElement([
          "Grilled chicken with salad",
          "Quinoa with grilled fish",
          "Grilled turkey wrap with veggies",
          "Brown rice with sautéed tofu and vegetables",
          "Grilled chicken with sweet potato and green beans",
          "Whole-wheat pasta with tomato sauce",
        ]),
        dinner: faker.helpers.arrayElement([
          "Steamed vegetables with brown rice",
          "Chicken soup with steamed broccoli",
          "Baked salmon with asparagus",
          "Lentil soup with spinach",
          "Stuffed bell peppers with black beans and rice",
          "Stir-fried shrimp with quinoa and veggies",
        ]),
      },
      exercise: {
        morning: faker.helpers.arrayElement([
          "15-minute jogging",
          "20 push-ups and planks",
          "10-minute brisk walking",
          "30 squats and lunges",
          "20-minute skipping rope",
          "15-minute yoga session",
        ]),
        evening: faker.helpers.arrayElement([
          "30-minute yoga session",
          "Cycling for 20 minutes",
          "45-minute pilates session",
          "40-minute strength training",
          "25-minute meditation",
          "40-minute dancing or Zumba session",
        ]),
      },
    },
    {
      food: {
        breakfast: faker.helpers.arrayElement([
          "Oatmeal with fruits",
          "Smoothie with spinach and banana",
          "Boiled eggs with whole-grain toast",
          "Greek yogurt with nuts and honey",
          "Chia pudding with berries",
          "Avocado toast with poached eggs",
          "Banana pancakes with almond butter",
        ]),
        lunch: faker.helpers.arrayElement([
          "Grilled chicken with salad",
          "Quinoa with grilled fish",
          "Grilled turkey wrap with veggies",
          "Brown rice with sautéed tofu and vegetables",
          "Grilled chicken with sweet potato and green beans",
          "Whole-wheat pasta with tomato sauce",
        ]),
        dinner: faker.helpers.arrayElement([
          "Steamed vegetables with brown rice",
          "Chicken soup with steamed broccoli",
          "Baked salmon with asparagus",
          "Lentil soup with spinach",
          "Stuffed bell peppers with black beans and rice",
          "Stir-fried shrimp with quinoa and veggies",
        ]),
      },
      exercise: {
        morning: faker.helpers.arrayElement([
          "15-minute jogging",
          "20 push-ups and planks",
          "10-minute brisk walking",
          "30 squats and lunges",
          "20-minute skipping rope",
          "15-minute yoga session",
        ]),
        evening: faker.helpers.arrayElement([
          "30-minute yoga session",
          "Cycling for 20 minutes",
          "45-minute pilates session",
          "40-minute strength training",
          "25-minute meditation",
          "40-minute dancing or Zumba session",
        ]),
      },
    },
    {
      food: {
        breakfast: faker.helpers.arrayElement([
          "Oatmeal with fruits",
          "Smoothie with spinach and banana",
          "Boiled eggs with whole-grain toast",
          "Greek yogurt with nuts and honey",
          "Chia pudding with berries",
          "Avocado toast with poached eggs",
          "Banana pancakes with almond butter",
        ]),
        lunch: faker.helpers.arrayElement([
          "Grilled chicken with salad",
          "Quinoa with grilled fish",
          "Grilled turkey wrap with veggies",
          "Brown rice with sautéed tofu and vegetables",
          "Grilled chicken with sweet potato and green beans",
          "Whole-wheat pasta with tomato sauce",
        ]),
        dinner: faker.helpers.arrayElement([
          "Steamed vegetables with brown rice",
          "Chicken soup with steamed broccoli",
          "Baked salmon with asparagus",
          "Lentil soup with spinach",
          "Stuffed bell peppers with black beans and rice",
          "Stir-fried shrimp with quinoa and veggies",
        ]),
      },
      exercise: {
        morning: faker.helpers.arrayElement([
          "15-minute jogging",
          "20 push-ups and planks",
          "10-minute brisk walking",
          "30 squats and lunges",
          "20-minute skipping rope",
          "15-minute yoga session",
        ]),
        evening: faker.helpers.arrayElement([
          "30-minute yoga session",
          "Cycling for 20 minutes",
          "45-minute pilates session",
          "40-minute strength training",
          "25-minute meditation",
          "40-minute dancing or Zumba session",
        ]),
      },
    },
  ];

  return plan;
};

const assign = async () => {
  const randomNumber = Math.floor(Math.random() * 4999) + 1;
  const plan = generatePersonalizedPlan();
  console.log(plan);
  return plan;
};


router.post("/assign-plan", async (req, res) => {
  console.log("reached");
   // Await the assignment of the food and exercise plan
   const foodAndExercisePlan = await assign();
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
    // const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const user = new User({
      name,
      email,
      phone,
      password: password,
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
  console.log("Triggered Login");
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
    if (password !== user.password) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = "I am token";

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

// Assuming you're using Express.js

// Route to fetch user's details and food/exercise plan
router.post("/user-details", async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    // Fetch user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Destructure relevant fields
    const { name, email, phone, items, completedDays } = user;

    // Map food and exercise plans
    const foodAndExercise = items.food.map((day, index) => ({
      day: index + 1,
      breakfast: day.breakfast,
      lunch: day.lunch,
      dinner: day.dinner,
      morningExercise: items.exercise[index]?.morning,
      eveningExercise: items.exercise[index]?.evening,
    }));

    // Include completedDays in the response
    res.json({
      name,
      email,
      phone,
      foodAndExercise,
      completedDays: completedDays || [], // Default to empty array if undefined
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/mark-completed", async (req, res) => {
  try {
    const { userId, day } = req.body;
    console.log(userId);

    if (!userId || day === undefined) {
      return res
        .status(400)
        .json({ success: false, message: "User ID and Day are required." });
    }

    // Fetch user
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Check if the day is already marked as completed
    if (user.completedDays.includes(day)) {
      return res
        .status(400)
        .json({ success: false, message: "Day already marked as completed." });
    }

    // Update completedDays array
    user.completedDays.push(day);

    // Recalculate adherence percentage
    const totalDays = 7; // Assuming 7-day schedule
    const adherencePercentage = (user.completedDays.length / totalDays) * 100;

    user.scheduleAdherence = adherencePercentage.toFixed(2);

    // Save updates
    await user.save();

    res.status(200).json({
      success: true,
      message: `Day ${day} marked as completed.`,
      completedDays: user.completedDays,
      scheduleAdherence: user.scheduleAdherence,
    });
  } catch (error) {
    console.error("Error marking day as completed:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

module.exports = router;
