const { Comment } = require("../Models/Comments");

const postComment = async (req, res) => {
  try {
    console.log(req.body);
    let { comment, userId, postId } = req.body;
    let createdComment = await Comment.create({
      post: postId,
      postedBy: userId,
      content: comment,
    });

    if (createdComment) {
      res.status(200).send();
    } else {
      res.status(400).send();
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = { postComment };
