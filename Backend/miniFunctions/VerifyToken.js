const { Token } = require("../Models/Token");
const { verificatonToken } = require("./verificationToken");

const verifyToken = async (token) => {
  const verifiedToken = await Token.findOne({ token });
  if (verifiedToken) {
    await Token.deleteOne({ token });
    return true;
  } else {
    return false;
  }
};

module.exports = { verifyToken };
