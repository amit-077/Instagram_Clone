const { Posts } = require("../Models/Posts");

const createPost = async (req, res) => {
  try {
    let { post, caption } = req.body;

    if (!post) {
      res.status(400).send();
      return;
    }

    let createdPost = await Posts.create({
      postedBy: req.user,
      content: post,
      caption,
    });

    if (createdPost) {
      console.log(createdPost);
      res.status(200).send("Post created successfully");
    } else {
      res.status(400).send("Error while creating post");
    }
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
};

module.exports = { createPost };
