const express = require("express");
const passport = require("passport");
const session = require("express-session");
const path = require("path");
const app = express();

// Settings
const port = process.env.port || 4001;
app.set("view engine", "ejs");

// Middlewares
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
require(path.join(__dirname, "./settings/passport-local"))(passport); // cambiando la ruta de mi strategia local

app.use(
	session({
    secret: "mi secerete de esta app ",
    resave: false,
    saveUninitialized: true
  })
);

// Routes
app.use(require("./routes/routes"));

// Server Runing

app.listen(port, () => {
  console.log("server runing on port " + port);
});
