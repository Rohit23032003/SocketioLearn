// import {v2 as cloudinary} from 'cloudinary';
// import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
// const cloudinary = require('cloudinary').v2;
// const fs = require('fs');

import { promises as fs } from 'fs';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_KEY, 
  api_secret:process.env.CLOUDINARY_SECRET 
});

const uploadOnCloudinary = async function(localPath){
    try {
        if(!localPath) return null;
        //upload
        const response = await cloudinary.uploader.upload(localPath , {
            resource_type :"auto",
            folder: "WebChatApp"
        });
        console.log(response);
        return response;
    } catch (error) {
        return null;
    }
}

export default uploadOnCloudinary ;

