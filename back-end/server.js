const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
connectDB();

const app = express();

// 🔐 IMPORT MIDDLEWARES
const corsMiddleware = require("./middleware/corsMiddleware");
const authMiddleware = require("./middleware/authMiddleware");
const authJWT = require("./middleware/authJWT");

// 🔥 DEBUG (VERY IMPORTANT FOR DEMO)
app.use((req, res, next) => {
  console.log("Request from origin:", req.headers.origin);
  next();
});

// ✅ BODY PARSER
app.use(express.json());

// 🔴 TO DEMO BLOCKING → COMMENT THIS
app.use(corsMiddleware);

// routes
app.use("/api", require("./routes/testRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

// ✅ protected DNS routes
app.use("/api/dns", authMiddleware, require("./routes/dnsRoutes"));

// example protected route
app.get("/api/profile", authJWT, (req, res) => {
  res.json({ message: "Welcome user 🎉", user: req.user });
});

// 🚀 START SERVER
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from backend" });
});