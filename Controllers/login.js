import User from '../Models/userModel.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

dotenv.config();

const login = async(req , res ) => {

    const accessTokenCookies = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

   const decoded_Id  =  jwt.verify(accessTokenCookies , 
    process.env.TOKEN_SECRET,(error , decoded)=>{
        if(error){
            console.log('getting Error while decoding' , error);
            return null;
        }
        return decoded.id;
   });

   if(decoded_Id !== null){
       console.log('access is expired');
       res.status(200).json(`user loged in ${decoded_Id}`);
   }
   else {
       console.log('loged in using accesstoken' , decoded_Id);
       res.status(500).json("message token expired");
   }
    
}

export default login ;
