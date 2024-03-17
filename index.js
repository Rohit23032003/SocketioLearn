import cors from 'cors';
import {Server} from 'socket.io';
import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import http from 'http';
import connect from './ConnectionDB/connectDb.js';
import router from "./Routes/routes.js";
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';

 

dotenv.config();

const userSocketMap = {};
const senderReceiverMap = {};

const RequestOrigin = "https://65f71c630ab77da6a9095015--clever-torte-d37428.netlify.app/"

const app = express();
app.use(cors({
    origin:RequestOrigin,
    methods:["GET" , "POST","DELETE","PUT","PATCH"],
    credentials:true
}));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());


const server = http.createServer(app);


const io = new Server(server , {
    cors:{
        origin:RequestOrigin,
        methods:["GET" , "POST","DELETE","PUT","PATCH"],
        credentials:true
    }
});



io.on("connection",(socket)=>{

    console.log("user connected with id ",socket.id);

    socket.on('setUserId', (senderId) => {
        console.log(`User ${senderId} connected with socket ID ${socket.id}`);
        userSocketMap[senderId] = socket.id;
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        const userId = Object.keys(userSocketMap).find(key => userSocketMap[key] === socket.id);
        if (userId) {
            delete userSocketMap[userId];
            delete senderReceiverMap[userId];
            console.log(`Removed mapping for user ${userId}`);
        }
    });

    socket.on("setReceiverId",({receiveId , sendId})=>{
        console.log("receiveID is " , receiveId , " sendID" , sendId);
        senderReceiverMap[sendId] = receiveId;
        // console.log(senderReceiverMap[sendId]);
    });

    socket.on('sendingMessage',({msg})=>{
        // console.log('sending message is  from ', receiverId , " to " , msg);
        const res = msg.receiverId;
        const sen = msg.senderId;
        const senderId = senderReceiverMap[sen];
        const receiverConnect = senderReceiverMap[senderId];
        const receiver = senderReceiverMap[receiverConnect];
        const socketId = userSocketMap[res];
        if(socketId && senderId === receiver){
            console.log(msg);
                io.to(socketId).emit('ReceiveMessage', {msg});
        }
        else {
            console.log(`User with ID ${socketId} is not connected.`);
        }
    })
});



app.use('/user', router);

const Port = process.env.PORT || 8000;

server.listen(Port, ()=>{
    console.log('Server running at' ,Port);
})

connect();
