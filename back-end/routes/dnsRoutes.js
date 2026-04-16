const express = require("express");
const router = express.Router();
const DNS = require("../models/DNSRecord");
const authJWT = require("../middleware/authJWT");


// ➕ ADD RECORD
router.post("/add", authJWT, async (req, res) => {
  const { domain, ip } = req.body;

  const record = new DNS({
    domain,
    ip,
    userId: req.user.id
  });

  await record.save();
  res.json({ message: "Record added ✅" });
});


// 📥 GET RECORDS
router.get("/", authJWT, async (req, res) => {
  const records = await DNS.find({ userId: req.user.id });
  res.json(records);
});


// ❌ DELETE RECORD
router.delete("/:id", authJWT, async (req, res) => {
  await DNS.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted ✅" });
});


// ✏️ UPDATE RECORD
router.put("/:id", authJWT, async (req, res) => {
  const { domain, ip } = req.body;

  await DNS.findByIdAndUpdate(req.params.id, { domain, ip });

  res.json({ message: "Updated ✅" });
});

module.exports = router;