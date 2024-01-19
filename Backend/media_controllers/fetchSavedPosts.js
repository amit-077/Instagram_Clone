const { User } = require("../Models/User");

const fetchSavedPosts = async (req, res) => {
  try {
    let foundUser = await User.findById(req.user)
      .select("savedPosts")
      .populate("savedPosts");
    res.status(200).send(foundUser);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { fetchSavedPosts };
