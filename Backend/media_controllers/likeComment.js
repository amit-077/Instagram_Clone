const { Comment } = require("../Models/Comments");

const likeComment = async (req, res) => {
  try {
    let comment = req.body.likedComment;

    let likeExist = await Comment.find({
      $and: [{ _id: comment }, { likes: req.user }],
    });

    if (likeExist.length > 0) {
      // remove like
      let data = await Comment.updateOne(
        { _id: comment },
        { $pull: { likes: req.user } }
      );

      if (data) {
        console.log(data);
        res.status(200).send();
      }
    } else {
      // add like
      let data = await Comment.updateOne(
        { _id: comment },
        { $push: { likes: req.user } }
      );
      if (data) {
        console.log(data);
        res.status(200).send();
      }
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = { likeComment };
