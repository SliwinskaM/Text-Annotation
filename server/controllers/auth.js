import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const router = express.Router();

export const getUsers = async (req, res) => {
    try {
        const allUsers = await User.find();

        res.status(200).json(allUsers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createUser = async (req, res) => {
    const { userName, password } = req.body;
    const newUser = new User({userName, password})
    try{
        await newUser.save();
        res.status(201).json(newUser);
    }catch(error){
        res.status(409).json({message: "something wrong!"})
    }
}

export const getUser = async(req, res) => {
    const {userName, password} = req.body;
    try {
        const user = await User.findOne({userName: userName});
        if(user.password == password){
            res.status(200).json(user);
        }else{
           res.status(404).json({ message: "Wrong password or login" });
       }
        
    } catch (error) {
        res.status(404).json({ message: "Wrong password or login" });
    }
}
export default router;