const express = require("express");
const { connectDB } = require("./Database/database");
const cookieParser = require("cookie-parser");
const {
  registerUser,
  registerUserGoogle,
  loginUser,
} = require("./controllers/Authentication");
const { User } = require("./Models/User");
const { sendVerificationMail } = require("./miniFunctions/mailSender");
const { createPost } = require("./media_controllers/createPost");
const { authenticateUser } = require("./auth_middleware/auth");
const { Posts } = require("./Models/Posts");
const { Token } = require("./Models/Token");
const {
  forgotPassword,
  changePassword,
} = require("./miniFunctions/forgotPassword");
const { getPosts } = require("./controllers/fetchMedia");
const { deletePost } = require("./media_controllers/deletePost");
const { savePost } = require("./media_controllers/savePost");
const { fetchSavedPosts } = require("./media_controllers/fetchSavedPosts");
const { createReel } = require("./media_controllers/createReel");
const { Reels } = require("./Models/Reels");
const { getAllReels } = require("./media_controllers/getAllReels");
const { searchUser } = require("./miniFunctions/searchUser");
const { getUser } = require("./miniFunctions/getUser");
const { postComment } = require("./media_controllers/postComment");
const { Comment } = require("./Models/Comments");
const { getComments } = require("./media_controllers/getComments");
const { deleteComment } = require("./media_controllers/deleteComment");
const { likeComment } = require("./media_controllers/likeComment");
const { followRequest } = require("./controllers/followReq");
const { likePost } = require("./media_controllers/likePost");
const { likeReel } = require("./media_controllers/reelLike");
const { saveReel } = require("./media_controllers/reelSave");
const { fetchAllPosts } = require("./media_controllers/fetchPosts");

sendVerificationMail;

const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cookieParser());

connectDB();

app.post("/register", registerUser);

app.post("/registerGoogle", registerUserGoogle);

app.post("/login", loginUser);

app.post("/createPost", authenticateUser, createPost);

app.post("/createReel", authenticateUser, createReel);

app.post("/forgotPassword", forgotPassword);

app.post("/changePassword", changePassword);

app.post("/getPosts", authenticateUser, getPosts);

app.post("/deletePost", deletePost);

app.post("/savePost", authenticateUser, savePost); // saves a post

app.get("/getSavedPosts", authenticateUser, fetchSavedPosts); // gets saved post by user.

app.get("/getAllReels", getAllReels);

app.post("/searchUser", authenticateUser, searchUser);

app.post("/getUser", getUser);

app.post("/postComment", postComment);

app.post("/fetchComments", getComments);

app.post("/deleteComment", deleteComment);

app.post("/likeComment", authenticateUser, likeComment);

app.post("/likePost", authenticateUser, likePost);

app.post("/follow", authenticateUser, followRequest);

app.post("/likeReel", authenticateUser, likeReel);

app.post("/saveReel", authenticateUser, saveReel);

app.get("/getAllPosts", authenticateUser, fetchAllPosts);

// Get funtions for testing

app.get("/showAllUsers", async (req, res) => {
  let users = await User.find();
  res.send(users);
});

app.get("/deleteAllUsers", async (req, res) => {
  let users = await User.deleteMany();
  res.send("All users deleted");
});

app.get("/showAllPosts", async (req, res) => {
  let posts = await Posts.find();
  res.send(posts);
});

app.get("/deleteAllPosts", async (req, res) => {
  let posts = await Posts.deleteMany();
  res.send("All Posts Deleted");
});

app.get("/getTokens", async (req, res) => {
  let posts = await Token.find();
  res.send(posts);
});

app.get("/getComments", async (req, res) => {
  let comments = await Comment.find();
  res.send(comments);
});

app.get("/deleteAllComments", async (req, res) => {
  await Comment.deleteMany();
  res.send("All comments deleted");
});

//

app.get("/deleteTokens", async (req, res) => {
  let posts = await Token.deleteMany();
  res.send("All tokens deleted");
});

app.get("/showReels", async (req, res) => {
  let reels = await Reels.find();
  res.send(reels);
});

// listen port
app.listen("5000", () => {
  console.log("Listening on port 5000");
});
