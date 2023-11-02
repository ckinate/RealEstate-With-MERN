import express from 'express';
import {test} from '../controllers/user.controller.js';

const router = express.Router();

//substituted with function from controllers folder
// router.get('/test', (req, res) => {
//     res.send('Hello world');
// });

//gamodzaxeba - http://localhost:3000/api/user/test
//because in index.js - app.use('/api/user', userRouter);
router.get('/test', test);

export default router;