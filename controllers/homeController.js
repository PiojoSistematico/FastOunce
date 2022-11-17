const Post = require("../models/postModel");

// @desc    Get home index
// @route   GET /
// @access  Public
const getIndex = (req, res) => {
  res.render("index.ejs");
};

// @desc    Get user profile
// @route   GET /profile/:id
// @access  Private
const getProfile = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id });
    res.render("profile.ejs", { posts: posts, user: req.user });
  } catch (err) {
    console.log(err);
  }
};

// @desc    Get all users  posts sorted by date
// @route   GET /feed
// @access  Private
const getFeed = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: "desc" }).lean();
    res.render("feed.ejs", { posts: posts, user: req.user });
  } catch (err) {
    console.log(err);
  }
};

// @desc    Get all users  posts sorted by date
// @route   GET /feed
// @access  Private
const getAddPost = async (req, res) => {
  res.render("addpost.ejs", { user: req.user });
};

module.exports = {
  getIndex,
  getProfile,
  getFeed,
  getAddPost,
};
