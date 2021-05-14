const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require('./lowdb_config.js')


passport.serializeUser((user, done) => {
  done(null, 'user.name');
});

module.exports = () => {
  passport.use(
    new LocalStrategy((username, password, done) => {
      // get user
      const user = db.get('users').find({username,password}).value()
      if (user) {     
        return done(null, { user });       
      }
      return done(null, false);
    })
  );
};
