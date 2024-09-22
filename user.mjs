// Import necessary libraries
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import passportLocalMongoose from "passport-local-mongoose";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

// Define user schema
const UserSchema = new mongoose.Schema({
    name:String,
    username: String,
    Address:String,
    Phone:String,
    password: String,
    cart:Array,
    image:[String],
    wishlist:Array,
    recentlyviewed:Array,
    tokens:Array,
    orders:Array
});

// Plugin Passport-Local Mongoose to handle hashing and salting of passwords
UserSchema.plugin(passportLocalMongoose);

// Define pre-save hook to hash the password before saving
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    console.log(this.password);
    try {
        const salt = await bcrypt.genSalt(10);
        console.log(salt);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        console.log(hashedPassword);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});



UserSchema.methods.generateToken = async function (){
    try{
        return jwt.sign({
            userId:this._id,
            username:this.username
        },
        process.env.LOGIN_SECRET,
        {
            expiresIn:"30d"
        }
        
        )
        
    }catch(error){
        console.log(error);
    }
}

// Create User model
const User = mongoose.model('User', UserSchema);

export default User;
