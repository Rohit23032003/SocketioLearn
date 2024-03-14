import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const connect = async() => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.NAME}:${process.env.PASSWORD}@cluster0.ukdtquy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
        console.log('MongoDb Connection Sucessfull');
    } catch (error) {
        console.log('MongoDb connection Error ' , error);
    }
}

export default connect ;
