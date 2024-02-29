import cors from 'cors';
import {Server} from 'socket.io';
import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import http from 'http';
import connect from './ConnectionDB/connectDb.js';
import router from "./Routes/routes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const userSocketMap = {};


const app = express();
app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET" , "POST"],
    credentials:true
}));

app.use(express.json());
app.use(cookieParser());

const server = http.createServer(app);


const io = new Server(server , {
    cors:{
        origin:"http://localhost:5173",
        methods:["GET" , "POST"],
        credentials:true
    }
})



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
            console.log(`Removed mapping for user ${userId}`);
        }
    });

    socket.on('sendingMessage',({receiverId , msg})=>{
        console.log('sending message is  from ', receiverId , " to " , msg);
        const socketId = userSocketMap[receiverId];
        if (socketId) {
            io.to(socketId).emit('ReceiveMessage', msg);
        } else {
            console.log(`User with ID ${userId} is not connected.`);
        }
    })
});


app.use('/user', router);

server.listen(8000, ()=>{
    console.log('Server running at 8000');
})

connect();
