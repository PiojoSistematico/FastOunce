const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

// @desc    Create comment
// @route   POST /comment/:id
// @access  Private
const createComment = async (req, res) => {
  //console.log(req.body);
  //console.log(req);
  try {
    await Comment.create({
      text: req.body.comment,
      post: req.params.id,
    });
    console.log("Comment has been added!");
    res.redirect(`/post/${req.params.id}`);
  } catch (err) {
    console.log(err);
  }
};

// @desc    Delete comment
// @route   Delete /comment/:id
// @access  Private
const deleteComment = async (req, res) => {
  try {
    // Find post by id
    let comment = await Comment.findById({ _id: req.params.id });
    await Comment.remove({ _id: req.params.id });
    console.log("Deleted Comment");
    res.redirect(`/post/${req.params.id}`);
  } catch (err) {
    res.redirect(`/post/${req.params.id}`);
  }
};

module.exports = {
  createComment,
  deleteComment,
};
