import User from '../Models/userModel.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

dotenv.config();

const signUp = async (req, res) => {
    const data = req.body;
    const { userName, email, password } = data;
    // console.log(userName , email , password);
    try {
        const exists = await User.findOne({userName , email});
        if(exists){
            return  res.status(500).json({success:false , message: "User Already Exists"});
        }
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUND));
        const refreshToken = jwt.sign({
            userName,
             email     
            }, process.env.TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });

        const newUser = new User({ userName, email, password: hashedPassword, refreshToken });

        await newUser.save();
        newUser.connections.push({
            senderId:newUser._id,
            userName:newUser.userName,
            userProfile:newUser.userProfile
        });
        await newUser.save();
        const AccessToken = jwt.sign({
            _id: newUser._id
        }, process.env.TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
        res.cookie('accessToken' , AccessToken , {httpOnly:true});
        res.cookie('refreshToken' , refreshToken , {httpOnly:true});

        res.status(200).json({ success:true , message: "User created successfully", newUser, AccessToken , refreshToken });
    
    } catch (error) {
        res.status(500).json({ success:false , 
            message: "Error while creating user" ,error});
    }
}

export default signUp;

