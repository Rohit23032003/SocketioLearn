import { Router } from "express";
import signUp from '../Controllers/signUp.js';
import {loginUsingData ,loginwithTokens }from '../Controllers/login.js';

const router = Router();

router.route('/').post(signUp);
router.route('/login').get(loginwithTokens);
router.route('/login').post(loginUsingData);


export default router;


