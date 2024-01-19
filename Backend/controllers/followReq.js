const { User } = require("../Models/User");

const followRequest = async (req, res) => {
  try {
    let { userId } = req.body;

    let followerExist = await User.find({
      $and: [{ _id: req.user }, { following: userId }],
    });

    if (followerExist.length > 0) {
      let data1 = await User.updateOne(
        { _id: userId },
        { $pull: { followers: req.user } }
      );

      let data2 = await User.updateOne(
        { _id: req.user },
        { $pull: { following: userId } }
      );

      if (data1 && data2) {
        res.status(200).send();
      }
    } else {
      let data1 = await User.updateOne(
        { _id: userId },
        { $push: { followers: req.user } }
      );

      let data2 = await User.updateOne(
        { _id: req.user },
        { $push: { following: userId } }
      );

      if (data1 && data2) {
        res.status(200).send();
      }
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = { followRequest };
