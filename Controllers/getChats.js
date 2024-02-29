import Chat from '../Models/chatModel.js';

const fetchChats = async (req , res) => {
    try {
        const {senderId , receiverId} = req.body;
        const chats = await Chat.find({
            $or:[
                {senderId:senderId , receiverId:receiverId},
                {senderId:receiverId , receiverId:senderId}
            ]
        });
        res.status(200).json({success:true , chats});
    } catch (error) {
        res.status(500).json({success:false , 
            message:'error while getting chats' , error});
    }
}
export default fetchChats;

