import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import User from "../models/User.js";
import { createError } from "../error.js";

export const signup = async (req, res, next) => {
    try{
        const {username, email, password} = req.body;
        const newUser = new User({username, email, password});
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
        // res.status(200).send("User has been created") 
    }catch(err){
        next(err)
    }
}

export const signin = async (req, res, next) => {
    try{
        const user = await User.findOne({username : req.body.username});
        if(!user) return next(createError(404, "Username not found"))
        
        // bcrypt.compare is an async function // hash here 
        const isCorrect = user.password === req.body.password
        if(!isCorrect) return next(createError(404, "Incorrect Password"))

        const token = jwt.sign({id:user._id}, process.env.JWT,{expiresIn:"259200000"})
        res.cookie("access_token", token, {
            httpOnly: true, 
            withCredentials: true
        }).status(200).json(user)
        // access token is a hashed token which includes our user id, we will use it to identify our user 

    }catch(err){
        next(err)
    }
}

export const logout = async (req, res, next) => {
    try{
        res.clearCookie("access_token", {sameSite:"none", secure:true}).status(200).send("logged out")
    }catch(err){
        next(err)
    }
}