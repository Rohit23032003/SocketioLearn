import { Router } from "express";
import signUp from '../Controllers/signUp.js';
import login from '../Controllers/login.js';

const router = Router();

router.route('/').post(signUp);
router.route('/login').get(login);

export default router;


