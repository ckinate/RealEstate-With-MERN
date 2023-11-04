import express from 'express';
import { signup, signin } from '../controllers/auth.controller.js';

const router = express.Router();

//gamodzaxeba - postman - post - http://localhost:3000/api/auth/signup
router.post("/signup", signup);
router.post("/signin", signin);

export default router;