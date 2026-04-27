const express = require("express");
const dotenv = require("dotenv");
const cron = require("node-cron");

dotenv.config();

const connectDB = require("./config/db");
connectDB();

const app = express();

// middleware
app.use(express.json());

let isBlocked = false;

// CRON JOB
cron.schedule("*/1 * * * *", () => {
  console.log("Cron running...");
  isBlocked = !isBlocked;
});

// STATUS API
app.get("/api/status", (req, res) => {
  res.json({ blocked: isBlocked });
});

// PORT FIX (VERY IMPORTANT)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});