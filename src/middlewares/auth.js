const isAuth = (req, res, next) =>{
    if(req.isAuthenticated()){
        next();
    }
    else{
        res.status(401).send({msg: "You are not authorized."})
    }
}

const isAdmin = (req, res, next) => {
    if(req.isAuthenticated() && req.user.admin){
        next();
    }
    else{
        res.status(401).send({msg: "Your are not authorized."})
    }
}

module.exports = { isAdmin, isAuth }