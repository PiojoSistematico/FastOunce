const Post = require("../models/postModel");
const User = require("../models/userModel");
const cloudinary = require("../middleware/cloudinary");

// @desc    Get user post
// @route   GET /post/:id
// @access  Private
const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const owner = await User.findById(post.user);
    res.render("post.ejs", { post: post, user: req.user, owner: owner });
  } catch (err) {
    console.log(err);
  }
};

// @desc    Create post
// @route   POST /post/:id
// @access  Private
const createPost = async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    await Post.create({
      title: req.body.title,
      image: result.secure_url,
      cloudinaryId: result.public_id,
      caption: req.body.caption,
      likes: 0,
      user: req.user.id,
    });
    console.log("Post has been added!");
    res.redirect("/profile");
  } catch (err) {
    console.log(err);
  }
};

// @desc    Update post
// @route   PUT /post/:id
// @access  Private
const likePost = async (req, res) => {
  try {
    await Post.findOneAndUpdate(
      { _id: req.params.id },
      {
        $inc: { likes: 1 },
      }
    );
    console.log("Likes +1");
    res.redirect(`/post/${req.params.id}`);
  } catch (err) {
    console.log(err);
  }
};

// @desc    Delete post
// @route   Delete /post/:id
// @access  Private
const deletePost = async (req, res) => {
  try {
    // Find post by id
    let post = await Post.findById({ _id: req.params.id });
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(post.cloudinaryId);
    // Delete post from db
    await Post.remove({ _id: req.params.id });
    console.log("Deleted Post");
    res.redirect("/profile");
  } catch (err) {
    res.redirect("/profile");
  }
};

module.exports = {
  getPost,
  createPost,
  likePost,
  deletePost,
};
