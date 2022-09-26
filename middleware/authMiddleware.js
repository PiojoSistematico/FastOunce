// this methods comes from passport

const ensureAuth = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/");
  }
};

module.exports = {
  ensureAuth,
};
