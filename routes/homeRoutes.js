const express = require("express");
const router = express.Router();
const {
  getIndex,
  getProfile,
  getFeed,
  getAddPost,
} = require("../controllers/homeController");
const { ensureAuth } = require("../middleware/authMiddleware");
const {
  getLogin,
  postLogin,
  logout,
  getSignup,
  postSignup,
} = require("../controllers/userController");

router.get("/", getIndex);
router.get("/profile/:id", ensureAuth, getProfile);
router.get("/feed", ensureAuth, getFeed);
router.get("/addpost", ensureAuth, getAddPost);
router.get("/login", getLogin);
router.post("/login", postLogin);
router.get("/logout", logout);
router.get("/signup", getSignup);
router.post("/signup", postSignup);

module.exports = router;
