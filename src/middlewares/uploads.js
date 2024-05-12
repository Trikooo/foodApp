const multer = require("multer");
const path = require("path");

const allowedMimeTypes = ["image/png", "image/jpeg", "image/webp", "image/jpg"];
const storage = multer.diskStorage({
    destination: "./uplods/images",
    filename: (req, file, cb) =>{
        cb(null, file.originalname + "-" + Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb)=> {
        if(file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/webp" || file.mimetype === "image/jpg"){
            cb(null, true)
        }
        else{
            
            const error = new Error("Unsupported filetype.");
            cb(error, false)
        }
    }
})
const uploadMiddleware = (req, res, next) => {
    upload.array("images", 10)(req, res, (err) => {
      if (err) {
        // Handle the error here
        console.error("Error occurred during file upload:", err);
        return res.status(500).json({ error: `An error occurred during file upload, ${err}` });
      }
      // If no error occurred, proceed to the next middleware
      next();
    });
  }
module.exports = uploadMiddleware;