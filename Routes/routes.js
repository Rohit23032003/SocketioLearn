import { Router } from "express";
import signUp from '../Controllers/signUp.js';
import {loginUsingData ,loginwithTokens }from '../Controllers/login.js';
import AllUsers from '../Controllers/AllUser.js';
import SavingChats  from '../Controllers/saveChats.js';

const router = Router();

router.route('/').post(signUp);
router.route('/login').get(loginwithTokens);
router.route('/login').post(loginUsingData);
router.route('/').get(AllUsers);
router.route('/chats').post(SavingChats);

export default router;


