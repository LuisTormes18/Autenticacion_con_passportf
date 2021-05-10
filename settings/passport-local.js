const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((user, done) => {
  done(null, 'user.name');
});

module.exports = () => {
  passport.use(
    new LocalStrategy((username, password, done) => {
      if (
        (username === "luistormes.lata@gmail.com") &
        (password == "1234567890")
      ) {
        return done(null, { username }); // despues le pasare el id y todo lo demás
      }
      return done(null, false);
    })
  );
};
