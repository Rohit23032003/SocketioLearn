import { Router } from "express";
import signUp from '../Controllers/signUp.js';

const router = Router();

router.route('/').post(signUp);

export default router;


