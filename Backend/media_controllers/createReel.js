const { Reels } = require("../Models/Reels");


const createReel = async (req, res) => {
  try {
    let { reel, caption } = req.body;

    if (!reel) {
      res.status(400).send();
      return;
    }

    let createdReel = await Reels.create({
      postedBy: req.user,
      content: reel,
      caption,
    });

    if (createdReel) {
      console.log(createdReel);
      res.status(200).send("Reel created successfully");
    } else {
      res.status(400).send("Error while creating post");
    }
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
};

module.exports = { createReel };
