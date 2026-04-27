const express = require("express");
const dotenv = require("dotenv");
const cron = require("node-cron");

// 🔐 Load env variables
dotenv.config();

// 🔗 DB Connection
const connectDB = require("./config/db");
connectDB();

const app = express();

// 🔐 IMPORT MIDDLEWARES
const corsMiddleware = require("./middleware/corsMiddleware");
const authMiddleware = require("./middleware/authMiddleware");
const authJWT = require("./middleware/authJWT");

// 🔥 DEBUG (optional for demo)
app.use((req, res, next) => {
  console.log("Request from origin:", req.headers.origin);
  next();
});

// ✅ BODY PARSER
app.use(express.json());

// ✅ CORS
app.use(corsMiddleware);

// ================================
// 🔥 CRON LOGIC
// ================================
let isBlocked = false;

cron.schedule("*/1 * * * *", () => {
  isBlocked = !isBlocked;
  console.log("Cron running... Blocked:", isBlocked);
});

// ================================
// 🔥 ROUTES
// ================================
app.use("/api", require("./routes/testRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

// 🔐 Protected DNS routes
app.use("/api/dns", authMiddleware, require("./routes/dnsRoutes"));

// 🔐 Example protected route
app.get("/api/profile", authJWT, (req, res) => {
  res.json({ message: "Welcome user 🎉", user: req.user });
});

// ================================
// 🔥 STATUS API (FOR CRON DEMO)
// ================================
app.get("/api/status", (req, res) => {
  res.json({ blocked: isBlocked });
});

// ================================
// 🚀 START SERVER
// ================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});