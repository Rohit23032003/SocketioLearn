import mongoose from "mongoose";
// Assuming this is correctly importing the User model

const chatSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true // corrected from 'require'
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true // corrected from 'require'
    },
    message:{
        type: String,
        required: true
    }
}, { timestamps: true });

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;

