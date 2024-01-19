// Tokens for email verificaton
const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
  },
});

const Token = mongoose.model("Token", tokenSchema);

module.exports = { Token };
