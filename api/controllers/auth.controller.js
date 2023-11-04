import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

export const signin = async (req, res, next) => {
    const {email, password} = req.body;
    try{
        //search user inside mongo atlas db
        const validUser = await User.findOne({email});
        if(!validUser) return next(errorHandler(404, 'User not found'));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword) return next(errorHandler(404, 'Not valid password'));
        //if both username and password is valid, then we need:
        //1. unique information - id, 2. secret key which we take from .env
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
        //destructure validUser to password and the rest part of an object
        //_doc contains all properties of an object
        const {password: pass, ...rest} = validUser._doc;
        //saving this token as cookie
        //res.cookie('access_token', token, {httpOnly: true}).status(200).json(validUser);
        //user not to see his password
        res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest);
    }
    catch(error){
        //handle error with middleware from index.js
        next(error)
    }
}