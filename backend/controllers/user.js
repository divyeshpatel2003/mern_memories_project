import mongoose from "mongoose";
import user from '../models/user.js';
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const secret = "test"

export const sign_in = async (req,res) => {
    const {email, password, custom} = req.body;

    try {
        const old_user = await user.findOne({email})
        if(!old_user) return res.status(404).json({message: "User doesn't exist"})

        const is_password_correct = await bcrypt.compare(custom ? password : "password", old_user.password)

        if(!is_password_correct) return res.status(404).json({message: "Invalid Email or Password"})
        
        const token = jwt.sign({email: old_user.email, id: old_user._id},secret, {expiresIn: "1h"})

        res.status(200).json({result: old_user, token})
        
    } catch (error) {
        res.status(500).json({message: "Something went wrong"})
        console.log(error)
    }
}
export const sign_up = async (req,res) => {
    const {email, password, first_name, last_name, custom} = req.body;

    try {
        const old_user = await user.findOne({email})
        if(old_user) return res.status(404).json({message: "User already exist"})

        // Google login because custom is false
        
        const hassed_password = await bcrypt.hash(custom ? password : "password", 12);

        const result = await user.create({email, password: hassed_password, name: `${first_name} ${last_name}`})

        const token = jwt.sign({email: result.email, id: result._id}, secret, {expiresIn: "1h"})

        res.status(200).json({result, token})
        
    } catch (error) {
        res.status(500).json({message: "Something went wrong"})
        console.log(error)
    }
}