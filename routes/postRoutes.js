const express = require("express");
const router = express.Router();
const {
  getPost,
  createPost,
  likePost,
  deletePost,
} = require("../controllers/postController");

//router.get("/:id", ensureAuth, postsController.getPost);
//router.post("/createPost", upload.single("file"), postsController.createPost);
//router.put("/likePost/:id", postsController.likePost);
//router.delete("/deletePost/:id", postsController.deletePost); */

router.get("/:id", getPost);
router.post("/createPost", createPost);
router.put("/likePost/:id", likePost);
router.delete("/deletePost/:id", deletePost);

module.exports = router;
