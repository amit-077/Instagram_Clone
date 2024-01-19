const { Token } = require("../Models/Token");

const verificatonToken = async () => {
  const verifiedToken = await Token.create({
    token: Math.floor(100000 + Math.random() * 900000),
  });

  return verifiedToken.token;
};

module.exports = { verificatonToken };
