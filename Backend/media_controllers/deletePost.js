const { Posts } = require("../Models/Posts");

const deletePost = async (req, res) => {
  try {
    const postToDelete = req.body.post;
    let deletedPost = await Posts.deleteOne({ _id: postToDelete });
    console.log(deletedPost);
    if (deletedPost) {
      res.status(200).send("Post Deleted");
    } else {
      res.status(400).send("Error while deleting Post");
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = { deletePost };
