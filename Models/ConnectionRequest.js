import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema({
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
    senderUserName:{
        type:String,
        require:true
    },
    senderUserProfile:{
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQoYalG0iZwdwwSFMhNL4aDADjcSJFcuo31Y9OY6saF8ZG5dq3lLc8uXw0eJfUwvdwjTw&usqp=CAU"
    },
    receiverUserName:{
        type:String,
        require:true
    },
    receiverUserProfile:{
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQoYalG0iZwdwwSFMhNL4aDADjcSJFcuo31Y9OY6saF8ZG5dq3lLc8uXw0eJfUwvdwjTw&usqp=CAU"
    },
    requestStatus:{
        type:Boolean,
        require:true,
        default:true
    }
},{timestamps:true});

const Request = mongoose.model('Request' , RequestSchema);

export default Request;
