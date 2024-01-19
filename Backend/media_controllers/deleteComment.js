const { Comment } = require("../Models/Comments");

const deleteComment = async (req, res) => {
  try {
    let commentToDelete = req.body.delComment;

    let deletedComment = await Comment.deleteOne({ _id: commentToDelete });

    if(deletedComment){
        res.status(200).send()
    }else{
        res.status(400).send()
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = { deleteComment };
