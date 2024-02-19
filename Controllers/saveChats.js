import Chat from '../Models/chatModel.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const SavingChats = async(req,res) => {
    try {
        const {senderId , receiverId , message} = req.body;

        const encryptMessage = await bcrypt.hash(message , parseInt(process.env.SALT_ROUND));

        const newChat = new Chat({
            senderId , 
            receiverId , 
            message:encryptMessage
        });

        await newChat.save();
        res.status(200).json({success:true , newChat});
    } catch (error) {
        res.status(400).json({message:'error while saving chats' , error});
    }
}


export default SavingChats ;


