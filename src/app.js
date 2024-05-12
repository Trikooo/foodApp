const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const validator = require("express-validator");
const dotenv = require("dotenv");
const { clientPromise } = require("./config/dbConfig.js");
const router = require("./routes/index.router.js");
const passport = require("passport");
require("./strategies/local-strategy.js");


// env vars setup
dotenv.config();
const PORT = process.env.PORT || 3000;
const { SESSION_SECRET } = process.env;
if (!SESSION_SECRET) {
  console.error("SESSION_SECRET env var is undefined");
  process.exit(1);
}
// initialiazation.
const app = express();

// middleware
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      client: clientPromise(),
    }),
  })
);
app.use(passport.session());
app.use(router);

// server
app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
