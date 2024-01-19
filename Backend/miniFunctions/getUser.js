const { Posts } = require("../Models/Posts");
const { User } = require("../Models/User");

const getUser = async (req, res) => {
  try {
    let { userId } = req.body;
    let user = await User.findOne({ _id: userId });
    let posts = await Posts.find({ postedBy: userId }).populate(
      "postedBy",
      "-password"
    );
    console.log(user);
    console.log(posts);
    res.status(200).send({ user, posts });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { getUser };
