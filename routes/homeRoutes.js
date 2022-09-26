const express = require("express");
const router = express.Router();
const {
  getIndex,
  getProfile,
  getFeed,
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
router.get("/profile", ensureAuth, getProfile);
router.get("/feed", ensureAuth, getFeed);
router.get("/login", getLogin);
router.post("/login", postLogin);
router.get("/logout", logout);
router.get("/signup", getSignup);
router.post("/signup", postSignup);

module.exports = router;
