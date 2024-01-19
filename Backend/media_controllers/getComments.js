const { Comment } = require("../Models/Comments");

const getComments = async (req, res) => {
  try {
    console.log(req.body);
    let { postId } = req.body;

    let comments = await Comment.find({ post: postId })
      .populate("postedBy", "-password")
      .select({ postedBy: 1, content: 1, likes: 1, createdAt: 1 })
      .sort({ "createdAt": -1 });

    console.log(comments);

    res.status(200).send(comments);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { getComments };
