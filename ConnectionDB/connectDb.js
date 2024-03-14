import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const connect = async() => {
    try {
        await mongoose.connect(process.env.MONGODBURL);
        console.log('MongoDb Connection Sucessfull');
    } catch (error) {
        console.log('MongoDb connection Error ' , error);
    }
}

export default connect ;
