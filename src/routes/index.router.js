const router = require("express").Router();
const loginRouter = require("./login.router.js");
const registerRouter = require("./register.router.js");
const productsRouter = require("./product.router.js");


router.use(loginRouter, registerRouter, productsRouter);

router.get("/", (req, res) =>{
    res.send("<h1>this is the home page</h1>");
})
module.exports = router