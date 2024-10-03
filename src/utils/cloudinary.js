// used with multer to upload files any type
// multer brings file to local storage and than cloudinary takes it from local to cloudinary database online
// two step setting --- reattempt re upload

//reusable code

import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
// fs
// by default library in nodejs need not to install called file system
// helps in file read write remove sync async open directory

// unlink --> delete (unlink from file system)

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        })
        //file has been uploaded
        console.log("File is uploaded on cloudinary", response.url);
        return response
    }
    catch (error) {
        fs.unlinkSync(localFilePath)
        // it removes the locally saved temporary file
        // if file is still on local delete it for precaution of being malicious
        return null
    }
}

export { uploadOnCloudinary }