const mongoose = require("mongoose");

const dnsSchema = new mongoose.Schema({
  domain: String,
  ip: String,
  userId: String
});

module.exports = mongoose.model("DNSRecord", dnsSchema);