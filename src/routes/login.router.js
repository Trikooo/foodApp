const router = require("express").Router();
const passport = require("passport");

router.get("/login", (req, res)=>{
    res.send('<h1>Login Page</h1><form method="post" action="login">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>')
})
router.post("/login", passport.authenticate("local", {failureRedirect: "/login", successRedirect: "/"}))
module.exports = router