const { Posts } = require("../Models/Posts");

const getPosts = async (req, res) => {
  try {
    const posts = await Posts.find({ postedBy: req.user }).sort({_id : -1});
    res.status(200).send(posts);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { getPosts };
