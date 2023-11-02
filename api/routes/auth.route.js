import express from 'express';
import { signup } from '../controllers/auth.controller.js';

const router = express.Router();

//gamodzaxeba - postman - post - http://localhost:3000/api/auth/signup
router.post("/signup", signup);

export default router;