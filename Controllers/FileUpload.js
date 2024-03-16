import uploadOnCloudinary from './Cloudinary.js';
import User from '../Models/userModel.js';

const FileUpload = async(req,res) => {
    const id = req.body.id;
    try {
        const localPath = req.file.path; // Get the local path of the uploaded file
        const cloudinaryUrl = await uploadOnCloudinary(localPath); // Upload to Cloudinary and get the URL
        const user = await User.findById({_id:id});
        if(!user){
           return  res.status(500).json({success : false , message:"User does not exists"});
        }
        user.userProfile = cloudinaryUrl.url;
        await user.save();
       return  res.status(200).json({success:true ,userProfile:cloudinaryUrl.url});

    } catch (error) {
        res.status(500).json({ success:false , error: 'Internal server error' });
    }
}

export default FileUpload;
