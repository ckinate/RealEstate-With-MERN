import express from 'express';
import {test} from '../controllers/user.controller.js';

const router = express.Router();

//gamodzaxeba - http://localhost:3000/api/user/test
//because in index.js - app.use('/api/user', userRouter);
//substituted with function from controllers folder
// router.get('/test', (req, res) => {
//     res.send('Hello world');
// });

router.get('/test', test);

export default router;