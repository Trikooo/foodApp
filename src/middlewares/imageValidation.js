const validateImages = (req, res, next) => {
    if(!req.files){
        return res.status(400).send("no Image files were uploaded");
    }
    console.log(req.files)
    next();


}

module.exports = validateImages;