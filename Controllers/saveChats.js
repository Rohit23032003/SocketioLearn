import Chat from '../Models/chatModel.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const SavingChats = async(req,res) => {
    try {
        const {senderId , receiverId , message} = req.body;

        const newChat = new Chat({ 
            senderId , 
            receiverId , 
            message
        });

        await newChat.save();
        res.status(200).json({success:true , newChat});
    } catch (error) {
        res.status(400).json({success:false ,
            message:'error while saving chats' , error});
    }
}


export default SavingChats ;


