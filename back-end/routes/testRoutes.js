const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    res.json({ message: "Login success ✅" });
  } else {
    res.status(401).json({ message: "Invalid credentials ❌" });
  }
});

module.exports = router;