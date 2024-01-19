const { Reels } = require("../Models/Reels");

const likeReel = async (req, res) => {
  try {
    let { reelId } = req.body;

    let likeExist = await Reels.find({
      $and: [{ _id: reelId }, { likes: req.user }],
    });

    if (likeExist.length > 0) {
      // remove like
      let data = await Reels.updateOne(
        { _id: reelId },
        { $pull: { likes: req.user } }
      );

      if (data) {
        console.log(data);
        res.status(200).send();
      }
    } else {
      // add like
      let data = await Reels.updateOne(
        { _id: reelId },
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

module.exports = { likeReel };
