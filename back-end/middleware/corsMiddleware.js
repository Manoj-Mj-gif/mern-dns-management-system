const allowedOrigins = [
  "http://127.0.0.1:5500",
  "http://localhost:5500",
  "https://cron-frontend.onrender.com" // 🔥 ADD THIS
];

const corsMiddleware = (req, res, next) => {
  const origin = req.headers.origin;

  console.log("Request from:", origin);

  // ✅ allow Postman / direct calls
  if (!origin || allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
  } else {
    return res.status(403).json({ message: "Blocked by CORS ❌" });
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, x-api-key"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
};

module.exports = corsMiddleware;