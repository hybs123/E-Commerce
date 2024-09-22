import jwt from "jsonwebtoken";
import User from "./user.mjs";
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cookieParser());

async function authenticateJwt(req, res, next) {
    try {
        const token = req.headers.authorization;
        // console.log(token);
        const verifyToken = jwt.verify(token, process.env.LOGIN_SECRET);

        // No need to wrap verifyToken.userId in ObjectId() constructor
        const id = verifyToken.userId;

        // Find the user by _id (ObjectId) and token
        const rootUser = await User.findOne({ _id: id});
        // console.log(rootUser);
        if (rootUser && rootUser.tokens) {
            // Find a token in the tokens array that matches the given token
            const tokenMatch = rootUser.tokens.find(userToken => userToken === token);
        
            // Check if a token match is found
            if (tokenMatch) {
                // Token match found, proceed with authentication
                req.token = token;
                req.rootUser = rootUser;
                req.userId = rootUser._id;
        
            
            } else {
                // Token not found in tokens array
                throw new Error("Unauthorized: Token not found in tokens array");
            }
        } else {
            // Either rootUser or tokens array not found
            throw new Error("Unauthorized: User not found or tokens array missing");
        }

        next();
    } catch (err) {
        res.status(401).send("Unauthorized");
        console.log(err);
    }
}

export default authenticateJwt;
