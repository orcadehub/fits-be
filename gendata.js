// Import the faker library
const { faker } = require("@faker-js/faker");
const fs = require("fs");

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

// Function to generate user data with answers to important questions
const generateUserData = () => {
  return {
    fullName: faker.person.fullName(),
    age: faker.number.int({ min: 18, max: 70 }),
    gender: faker.helpers.arrayElement(["Male", "Female", "Other"]),
    height: faker.number.int({ min: 150, max: 200 }) + " cm",
    weight: faker.number.int({ min: 50, max: 120 }) + " kg",
    seizuresFrequency: faker.helpers.arrayElement([
      "Daily",
      "Few times a week",
      "Once a week",
      "Few times a month",
      "Rarely",
    ]),
    medication: faker.helpers.arrayElement(["Yes", "No"]),
    dietPreference: faker.helpers.arrayElement([
      "Keto",
      "Mediterranean",
      "Low-carb",
      "Vegan",
      "No specific diet",
    ]),
    sleepHours: faker.number.int({ min: 4, max: 10 }) + " hours",
    waterIntake: faker.helpers.arrayElement(["Low", "Moderate", "High"]),
    stressLevel: faker.helpers.arrayElement(["Low", "Moderate", "High"]),
    foodAllergies: faker.helpers.arrayElements(
      ["Peanuts", "Dairy", "Gluten", "Soy", "None"],
      faker.number.int({ min: 1, max: 2 })
    ),
    triggers: faker.helpers.arrayElement([
      "Stress",
      "Lack of sleep",
      "Alcohol",
      "Caffeine",
      "Bright lights",
    ]),
    goals: faker.helpers.arrayElement([
      "Reduce seizures",
      "Improve fitness",
      "Manage stress",
      "Build muscle",
    ]),
    plan: generatePersonalizedPlan(),
  };
};

// Generate a large dataset (e.g., 200 samples)
const generateDataSet = (count) => {
  const dataSet = [];
  for (let i = 0; i < count; i++) {
    dataSet.push(generateUserData());
  }
  return dataSet;
};

// Write the data to a file
const data = generateDataSet(5000);
fs.writeFileSync("user7DayPlans.json", JSON.stringify(data, null, 2));
console.log("✅ 200 user-specific 7-day plans have been generated.");
