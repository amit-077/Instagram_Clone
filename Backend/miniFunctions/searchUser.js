const { User } = require("../Models/User");

const searchUser = async (req, res) => {
  console.log("searching user");
  try {
    let { searchInput } = req.body;
    console.log(req.user);
    let data = await User.find(
      {
        $or: [
          { name: { $regex: searchInput, $options: "i" } },
          { username: { $regex: searchInput, $options: "i" } },
        ],
        _id: { $ne: req.user },
      },
      { password: 0, email: 0 }
    );

    console.log(data);
    res.status(200).send(data);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { searchUser };
