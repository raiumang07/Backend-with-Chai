import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

// how to encrypt no direct encryption possible hooks are used --> pre hook

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true// for easy search 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String,// cloudinary service
        required: true,
    },
    coverImage: {
        type: String,// cloudinary URL
    },
    watchHistory: {// makes the project so hard
        type: Schema.Types.ObjectId,// will use mongoose aggregate paginate package
        ref: "Video"
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    refreshToken: {
        type: String
    }
}, { timestamps: true })// created at , updated at


// library we will use
//bcrypt js  -- library helps to hash your password
// jwt -- for token json web token , jwt.io to see tokens , payload (data) and secret key

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();// if not modified password then return 

    this.password = bcrypt.hash(this.password, 10)//encrypts the passsword on each change
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {// slow so async used
    return await bcrypt.compare(password, this.password)
    // bcrypt itself has the feature to compare password
}

//jwt --> bearer token 
// both are jwt tokens below
// sign method with many parameters 
// id is unique _id from mongodb
userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}
userSchema.methods.refreshAccessToken = function () {
    return jwt.sign({
        id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })
}

export const User = mongoose.model("User", userSchema)