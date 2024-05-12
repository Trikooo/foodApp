const router = require("express").Router();
const registerUser = require("../controllers/register.controller.js").registerUser;
const registerAdmin = require("../controllers/register.controller.js").registerAdmin;
const isAdmin = require("../middlewares/auth.js").isAdmin;

// regular user registration
router.get("/register", (req, res)=>{
    res.send('<h1>Register Page</h1><form method="post" action="/register">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>')
})

router.post("/register", registerUser)

//admin registration
router.get("/register-admin", isAdmin, (req, res) => {
    res.send('<h1>Admins Registeration Page</h1><form method="post" action="/register-admin">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>')
})
router.post("/register-admin", registerAdmin)

module.exports = router