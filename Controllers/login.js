import User from '../Models/userModel.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt, { decode } from "jsonwebtoken";

dotenv.config();


const loginUsingData = async (req , res) => {
    try {
        const{userName , password} = req.body;
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(200).json({ success: false, message: 'User doesnot exists' });
        }
        const passwordMatch = await  bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(200).json({ success: false, message: 'Invalid credentials' });
        }
        const newUser = {
            _id:user._id,
            userName:user.userName,
            email:user.email
        }
        
        const accessToken = jwt.sign({
            _id: user._id
        }, process.env.TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });        
    
        const refreshToken = jwt.sign({
            userName:user.userName,
             email:user.email     
            }, process.env.TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });

            user.refreshToken = refreshToken;
            await user.save();

            res.cookie('accessToken' , accessToken , {httpOnly:true});
            res.cookie('refreshToken' , refreshToken , {httpOnly:true});
            res.status(200).json({ success: true, newUser, accessToken , refreshToken});

    } catch (error) {
         res.status(500).json({ success: false, message: 'An unexpected error occurred',error});
    }
};


const loginwithTokens = async (req, res) => {
    const accessTokenCookies = req.cookies?.accessToken;
    const refreshToken = req.cookies?.refreshToken;

    if (accessTokenCookies) {
        try {
            const decodedData = await jwt.verify(accessTokenCookies, process.env.TOKEN_SECRET);
            if (decodedData) {
                const existedUser = await User.findById(decodedData);
                if (existedUser) return res.status(200).json({ success:true , message: "Logged in using access token", user: existedUser });
            }
        } catch (error) {
            return res.status(500).json({ success:false , error: 'Error while verifying access token' });
        }
    }

    if (refreshToken) {
        try {
            const decodedData = await jwt.verify(refreshToken, process.env.TOKEN_SECRET);
            if (decodedData) {
                const userName = decodedData.userName;
                const user = await User.findOne({userName });
                if (user && user.refreshToken === refreshToken) return res.status(200).json({success:true , message: 'Logged in using refresh token', user });
            }
        } catch (error) {
            return res.status(500).json({ success:false , message: 'Error while verifying refresh token', error});
        }
    }

    return res.status(500).json({ success:false ,message: 'Both access and refresh tokens are expired' });
};
export  {loginUsingData , loginwithTokens};

