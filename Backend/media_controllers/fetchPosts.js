const { Posts } = require("../Models/Posts");

const fetchAllPosts = async (req, res) => {
  try {
    let posts = await Posts.find().populate("postedBy");
    if (posts) {
      res.status(200).send(posts);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { fetchAllPosts };
