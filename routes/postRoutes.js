const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {
  getPost,
  createPost,
  likePost,
  deletePost,
} = require("../controllers/postController");
const { ensureAuth } = require("../middleware/authMiddleware");

router.get("/:id", ensureAuth, getPost);
router.post("/createPost", upload.single("file"), createPost);
router.put("/likePost/:id", likePost);
router.delete("/deletePost/:id", deletePost);

module.exports = router;
