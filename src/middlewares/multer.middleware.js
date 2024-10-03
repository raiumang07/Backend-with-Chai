import multer from "multer"
// used as a middleware
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp")// will keep files in our public folder
    },
    filename: function (req, file, cb) {
        //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)  // for later
        cb(null, file.originalname)//fieldname + '-' + uniqueSuffix)// read file by console.log
    }
})

export const upload = multer({
    storage,
})