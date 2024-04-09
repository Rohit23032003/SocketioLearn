import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    userProfile:{
            type: String,
            default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQoYalG0iZwdwwSFMhNL4aDADjcSJFcuo31Y9OY6saF8ZG5dq3lLc8uXw0eJfUwvdwjTw&usqp=CAU"
    },
    connections:[
        {
            senderId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User", // Reference to the User model
                required: true // corrected from 'require'
            },
            userName:{
                type:String,
                require:true
            },
            userProfile:{
                type:String,
                require:true
            }
        }
    ],
    refreshToken:String
},{timestamps:true});

 const User = mongoose.model('User' , userSchema);
 
 export default User;

 