const { User } = require("../Models/User");

const saveReel = async (req, res) => {
  let postExists = await User.find({
    $and: [{ _id: req.user }, { savedPosts: req.body.reelId }],
  });

  if (postExists.length > 0) {
    // remove post from saved
    let removedPost = await User.updateOne(
      { _id: req.user },
      { $pull: { savedPosts: req.body.reelId } }
    );

    console.log(removedPost);

    if (removedPost) {
      let updatedUser = await User.findOne({ _id: req.user });
      res.status(200).send(updatedUser);
    }
  } else {
    // saved Post
    let savedPost = await User.updateOne(
      { _id: req.user },
      { $push: { savedPosts: req.body.reelId } }
    );

    console.log(savedPost);
    if (savedPost) {
      let updatedUser = await User.findOne({ _id: req.user });
      res.status(201).send(updatedUser);
    }
  }
};

module.exports = { saveReel };
