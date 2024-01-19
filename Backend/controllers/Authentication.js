const { Token } = require("../Models/Token");
const { User } = require("../Models/User");
const { verifyToken } = require("../miniFunctions/VerifyToken");
const { sendVerificationMail } = require("../miniFunctions/mailSender");
const { generateToken } = require("../miniFunctions/tokenGeneration");

const registerUser = async (req, res) => {
  try {
    let { name, email, username, password, otp, googleLogin } =
      req.body.userDetails;

    if (!name || !email || !username) {
      console.log("Please fill deatils");
      res.status(400).send("Please fill details");
      return;
    }

    const userExists = await User.findOne({ email });
    const userNameExists = await User.findOne({ username });

    if (userExists) {
      console.log("User already exists");
      res.status(401).send("User already exists");
      return;
    }

    if (userNameExists) {
      if (userNameExists?.username !== "new_user") {
        console.log("Cannot take username, it exists");
        res.status(402).send("Choose different username");
        return;
      }
    }

    if (!otp) {
      sendVerificationMail(name, email);
      res.status(202).send("OTP sent to email");
      return;
    } else {
      const token = await verifyToken(otp);
      if (token) {
        console.log("User verified through email OTP");
      } else {
        res.status(302).send("Invalid OTP");
        return;
      }
    }

    const user = await User.create({
      name,
      email,
      username,
      password,
      googleAuth: googleLogin,
      verified: true,
    });

    if (user) {
      console.log(user);
      let generatedToken = await generateToken(user.id);
      console.log(generatedToken);
      res
        .cookie("instagram_clone", generatedToken, {
          maxAge: 3600000 * 24 * 30,
          httpOnly: true,
        })
        .status(200)
        .json(user);
      return;
    }
  } catch (e) {
    console.log(e);
    return;
  }
};

const registerUserGoogle = async (req, res) => {
  try {
    let { name, email, username, password, googleLogin } = req.body;

    if (!name || !email || !username) {
      console.log("Please fill deatils");
      res.status(400).send("Please fill details");
      return;
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      console.log("Google login successful");
      res.status(200).send();
      return;
    }

    const user = await User.create({
      name,
      email,
      username,
      password,
      googleAuth: googleLogin,
    });

    if (user) {
      console.log("User created through google register");
      console.log(user);
      res
        .cookie("instagram_clone", generateToken(user._id), {
          maxAge: 3600000 * 24 * 30,
          httpOnly: true,
        })
        .status(200)
        .json(user);
      return;
    }
  } catch (e) {
    console.log(e);
    return;
  }
};

const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body.userDetails;

    let userExists = await User.findOne({ email });
    console.log(userExists);
    if (userExists) {
      if (userExists.password === password) {
        let generatedToken = await generateToken(userExists.id);
        console.log(generatedToken);
        res
          .cookie("instagram_clone", generatedToken, {
            maxAge: 3600000 * 24 * 30,
            httpOnly: true,
          })
          .status(200)
          .send(userExists);
        return;
      } else {
        console.log("Wrong password");
        res.status(400).send("Wrong password");
      }
    } else {
      res.status(401).send("User does not exists");
      console.log("Login Failed, user does not exists");
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  registerUser,
  registerUserGoogle,
  loginUser,
};
