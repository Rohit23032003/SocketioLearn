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

connect();

app.use('/user', router);

server.listen(3000, ()=>{
    console.log('Server running at 3000');
})

