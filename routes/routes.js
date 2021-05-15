const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");

const db = require("../settings/lowdb_config");
const router = express.Router();

router.get(
  "/",
  (req, res, next) => {
    const login = req.session.login;

    if (login) {
      console.log(req.session);
      next();
    } else {
      res.render("index");
      return;
    }
  },
  (req, res) => {
    res.render("./main");
  }
);

// login
router.get("/login", (req, res) => {
  res.render("Login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    req.session.login = true;
    res.redirect("./main");
  }
);
// main----------------------------------------------------------
router.get(
  "/main",
  (req, res, next) => {
    const login = req.session.login;

    if (!login) {
      res.status(401).send({ error: `Es nesesario estar Logueado!` });
      return;
    }
    //console.log(req.session);
    next();
  },
  (req, res) => {
    const user = req.session.passport.user;
    res.render("main", { user });
  }
);

// cerra session

router.get("/signout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

// register
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { name, username, password } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      db.get("users").push({ name, username, password: hash }).write();
    });
  });
  res.render("main", { user: { name } });
});

//----------------------------------------------------------------------------------------------------

module.exports = router;
