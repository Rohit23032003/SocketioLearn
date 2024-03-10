import uploadOnCloudinary from './Cloudinary.js';

const FileUpload = async(req,res) => {
    try {
        const localPath = req.file.path; // Get the local path of the uploaded file
        const cloudinaryUrl = await uploadOnCloudinary(localPath); // Upload to Cloudinary and get the URL
        res.status(200).json({ success:true , profileUrl:cloudinaryUrl.url});
    } catch (error) {
        console.error('Error handling upload:', error);
        res.status(500).json({ success:false , error: 'Internal server error' });
    }
}

export default FileUpload;
