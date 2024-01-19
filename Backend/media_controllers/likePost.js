const { Posts } = require("../Models/Posts");

const likePost = async (req, res) => {
  try {
    let { postId } = req.body;

    let likeExist = await Posts.find({
      $and: [{ _id: postId }, { likes: req.user }],
    });

    if (likeExist.length > 0) {
      // remove like
      let data = await Posts.updateOne(
        { _id: postId },
        { $pull: { likes: req.user } }
      );

      if (data) {
        console.log(data);
        res.status(200).send();
      }
    } else {
      // add like
      let data = await Posts.updateOne(
        { _id: postId },
        { $push: { likes: req.user } }
      );
      if (data) {
        console.log(data);
        res.status(201).send();
      }
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = { likePost };
