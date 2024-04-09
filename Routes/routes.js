import { Router } from "express";
import signUp from '../Controllers/signUp.js';
import {loginUsingData ,loginwithTokens }from '../Controllers/login.js';
import AllUsers from '../Controllers/AllUser.js';
import SavingChats  from '../Controllers/saveChats.js';
import fetchChats from '../Controllers/getChats.js';
import SignOut  from "../Controllers/SignOut.js";
import DeleteChats from "../Controllers/DeleteChats.js";
import upload from '../Controllers/multer.js';
import FileUpload from '../Controllers/FileUpload.js';

import {UserRequest , RequestAccept , 
    RequestReceived , deleteRequest ,
     requestStatusChange , RequestSent} from '../Controllers/UserRequest.js';


import ConnectedUsers from '../Controllers/Connections.js';

const router = Router();

router.route('/').post(signUp);
router.route('/').get(AllUsers);
router.route('/').delete(SignOut);
router.route('/profile').post(upload.single('UserFile') , FileUpload);
router.route('/login').get(loginwithTokens);
router.route('/login').post(loginUsingData);
router.route('/chats').post(SavingChats);
router.route('/chats/:id').delete(DeleteChats);
router.route('/personalchats').post(fetchChats);
router.route('/UserRequest').post(UserRequest);
router.route('/RequestAccept').post(RequestAccept);
router.route('/ConnectedUser').get(ConnectedUsers);
router.route('/RequestSent').get(RequestSent);
router.route('/RequestReceived').get(RequestReceived);
router.route('/deleteRequest').delete(deleteRequest);
router.route('/requestStatusChange').post(requestStatusChange);

export default router;


