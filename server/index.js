import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import User from './models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express();

app.use(cors());
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/full_mern_stack');

app.post('/api/register', async (req, res) => {
    try{
        const newPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword
        });
        res.json({ status: 'ok'});
    }catch(e) {
        res.json({status: 'error', error: "Duplicate email"});
    }
});

app.get('/api/quote', async (req, res) => {
    
    const token = req.headers['x-access-token'];
    console.log('quote token', token)
    try{    
        const decoded = jwt.verify(token, 'secret123');
        const email = decoded.email;
        
        const user = await User.findOne({email:email});

        return res.json({status: 'ok', quote: user.quote});
    } catch(e) {
        res.json({status: 'error', error: "Invalid token"});
    }
});

app.post('/api/quote', async (req, res) => {
    const token = req.headers['x-access-token'];
    try{    
        const decoded = jwt.verify(token, 'secret123');
        const email = decoded.email;
        
        await User.updateOne(
            {email: email},
            {$set: {quote: req.body.quote }}
        )

        return res.json({status: 'ok'});
    } catch(e) {
        res.json({status: 'error', error: "Invalid token"});
    }
});
app.post('/api/login', async (req, res) => {
    try{
        const user = await User.findOne({
            email: req.body.email,
        });

        if(!user) {
            return res.json({status: 'error', error: 'Invalid Username'})
        }
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

        if(user && isPasswordValid) {
            const token = jwt.sign({
                email: user.email,
                name: user.name
            }, 'secret123')
            //console.log(token);
            return res.json({status: 'ok', user: token})
        } else {
            return res.json({status: 'error', user: false})
        }

        res.json({ status: 'ok'});
    }catch(e) {
        res.json({status: 'error', error: "Duplicate email"});
    }
})

app.listen(8888, () => {
    console.log('Server start on port 8888!');
})