const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
  try {
    let user = await req.cookies.instagram_clone;
    if (user) {
      let token = jwt.verify(user, process.env.JWT_SECRET);
      req.user = token.id;
      next();
    } else {
      res.status(400).send();
    }
  } catch (e) {
    console.log(e);
    res.status(400).send("Unable to authenticate user");
  }
};

module.exports = { authenticateUser };
