const { User } = require("../Models/User");

const savePost = async (req, res) => {
  let postExists = await User.find({
    $and: [{ _id: req.user }, { savedPosts: req.body.post }],
  });

  if (postExists.length > 0) {
    // remove post from saved
    let removedPost = await User.updateOne(
      { _id: req.user },
      { $pull: { savedPosts: req.body.post } }
    );

    console.log(removedPost);

    if (removedPost) {
      res.status(200).send();
    }
  } else {
    // saved Post
    let savedPost = await User.updateOne(
      { _id: req.user },
      { $push: { savedPosts: req.body.post } }
    );

    console.log(savedPost);
    if (savedPost) {
      res.status(200).send();
    }
  }
};

module.exports = { savePost };
