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
    refreshToken:String
},{timestamps:true});

 const User = mongoose.model('User' , userSchema);
 
 export default User;
