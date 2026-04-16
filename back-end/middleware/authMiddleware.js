const API_KEY = process.env.API_KEY;

const authMiddleware = (req, res, next) => {
  const key = req.headers["x-api-key"];

  if (!key) {
    return res.status(401).json({ message: "API key missing ❌" });
  }

  if (key !== API_KEY) {
    return res.status(403).json({ message: "Invalid API key ❌" });
  }

  next();
};

module.exports = authMiddleware;