const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/user.model.js");
const verifyPassword = require("../utils/passwordUtils.js").verifyPassword;

const verifyCallback = async (username, password, done) => {
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      throw new Error("User not found.");
    }
    const { salt, hash } = user
    const isValid = verifyPassword(salt, hash, password);
    if (isValid) {
      done(null, user);
    } else {
      throw new Error("Invalid Password");
    }
  } catch (error) {
    done(error, null);
  }
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((error) => done(error));
});

 
passport.use(new LocalStrategy(verifyCallback))

