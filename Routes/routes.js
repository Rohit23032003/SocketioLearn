import { Router } from "express";
import signUp from '../Controllers/signUp.js';
import {loginUsingData ,loginwithTokens }from '../Controllers/login.js';
import AllUsers from '../Controllers/AllUser.js';

const router = Router();

router.route('/').post(signUp);
router.route('/login').get(loginwithTokens);
router.route('/login').post(loginUsingData);
router.route('/').get(AllUsers);


export default router;


