const {Reels} = require("../Models/Reels")

const getAllReels = async(req,res)=>{
    let reels = await Reels.find().populate("postedBy", "-password");
    res.send(reels);
}

module.exports = {getAllReels}