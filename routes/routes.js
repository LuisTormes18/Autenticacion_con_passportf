const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/", (req, res) => {
  if (!req.session) {
    res.redirect("login");
  } else {
    res.redirect("main");
  }
  // res.redirect("/login");
});

router.get("/login", (req, res) => {
  res.render("index");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/main",
    failureRedirect: "/login",
  })
);
router.get("/main", (req, res) => {
  req.session.cookie.idUsersession = 12345;
  console.log(req.session);
  res.render("main");
});

module.exports = router;
