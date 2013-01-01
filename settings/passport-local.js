const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcryptjs');
const db = require('./lowdb_config.js')


passport.serializeUser((user, done) => {
  done(null, user);
});

// passport.deserializeUser((id, done)=> {
//     User.findById(id,(err, user) => {
//         done(err, user);
//     });
// });

module.exports = () => {
  passport.use(
    new LocalStrategy((username, password, done) => {
      // get user
      const user = db.get('users').find({username}).value()
      if (!user) {

        return done(null, false);
      }
      if(!bcrypt.compareSync(password,user.password)){
        return done(null,false)
      }
      return done(null, user );
    })
  );
};
