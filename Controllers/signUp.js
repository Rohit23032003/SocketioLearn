import User from '../Models/userModel.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

dotenv.config();

const signUp = async (req, res) => {
    const data = req.body;
    const { userName, email, password } = data;
    try {
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUND));
        const refreshToken = jwt.sign({
            userName,
             email     
            }, process.env.TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });

        const newUser = new User({ userName, email, password: hashedPassword, refreshToken });

        await newUser.save();

        const AccessToken = jwt.sign({
            _id: newUser._id
        }, process.env.TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
        res.cookie('accessToken' , AccessToken , {httpOnly:true});
        res.cookie('refreshToken' , refreshToken , {httpOnly:true});

        res.status(201).json({ message: "User created successfully", newUser, AccessToken });

    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export default signUp;

