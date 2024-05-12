const genPassword = require("../utils/passwordUtils.js").genPassword;
const User = require("../models/user.model.js");

const registerUser = async (req, res) =>{
    const { username, password } = req.body
    console.log("i am regular user function")

    try{
        const user = await User.findOne({username: username});
        if(user){
            res.status(409).send("User alredy exists");
            console.log(user)
        }
       if(!user){
        const saltHash = genPassword(password);
        const newUser = new User({
            username: username,
            ...saltHash,
            admin: false

        });
        newUser.save();
        res.status(200).send("User created successfully!")
       }
    }catch(error){
        res.status(500).send(error)
    }
}

const registerAdmin = async (req, res)=>{
    console.log("i am superuser function")
    const { username, password } = req.body;
    try {
        const user = await User.findOne({username: username})
        if(user){
            throw new Error("Admin already exists");
        }
        else{
            const saltHash = genPassword(password);
            console.log(saltHash);
            const newUser = new User({
                username: username,
                ...saltHash,
                admin: true
            })
            await newUser.save();
            res.status(200).send("Admin creatd successfully."); 
            
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = { registerUser, registerAdmin };