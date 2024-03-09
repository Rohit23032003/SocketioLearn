import Chat from '../Models/chatModel.js';

const DeleteChats = async (req , res ) => {
    const id = req.params.id.slice(1);
    console.log("Chat Delete ID is ",id);
    try{
        const deletedChat = await Chat.deleteOne({_id:`${id}`});
        if(deletedChat.deletedCount == 1) {
            return res.status(200).json({sucess : true , message:"Chat Deleted" , id});
        }
        else{
            return res.status(400).json({sucess : false , message:"Chat not found " , id});
        }
    }catch(error){
        return res.status(400).json({sucess : false , message:"Error occur while Deleting Chat" , error});
    }
}

export default DeleteChats ;
