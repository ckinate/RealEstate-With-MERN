import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res, next) => {
    //show request body from postman in terminal - fe: username: 'test', email: 'test@gmail.com', password: 'vasil'
    //console.log(req.body);
    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    //const newUser = new User({username, email, password});
    const newUser = new User({username, email, password:hashedPassword});
    try{
        await newUser.save();
        res.status(201).json('User created successfully');
    }
    catch(error){
        //res.status(500).json(error.message);
        //error handling comes from our middleware from index.js
        next(error);
    }
    
}