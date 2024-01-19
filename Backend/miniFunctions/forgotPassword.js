const { Token } = require("../Models/Token");
const { User } = require("../Models/User");
const { verifyToken } = require("./VerifyToken");
const { forgotPasswordMail } = require("./mailSender");

const forgotPassword = async (req, res) => {
  try {
    let { email, otp } = req.body;

    if (otp) {
      let verifiedUser = await verifyToken(otp);
      if (verifiedUser) {
        res.status(201).send("OTP Verified");
        await Token.deleteOne({ token: otp });
        return;
      } else {
        res.status(401).send("Invalid OTP");
        return;
      }
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      let { name, email } = userExists;
      forgotPasswordMail(name, email);
      res.status(200).send();
    } else {
      res.status(400).send("User does not exist");
      return;
    }
    res.send();
  } catch (e) {
    console.log(e);
  }
};

const changePassword = async (req, res) => {
  let { email, password } = req.body;
  try {
    let updatedUser = await User.updateOne({ email }, { $set: { password } });
    console.log(updatedUser);
    if (updatedUser) {
      res.status(202).send();
      return;
    } else {
      res.status(405).send();
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = { forgotPassword, changePassword };
