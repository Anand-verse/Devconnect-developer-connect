import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authMiddleware from '../middleware/authMiddleware.js';
// import dotenv from 'dotenv';

// dotenv.config();

const router = express.Router();

router.post('/signup' , async (req ,res)=>{
    const {name , email ,password } = req.body;
    
    try {
    const hashedPassword = await bcrypt.hash(password , 10);
        await User.create({
             name ,
             email ,
             password:hashedPassword});

        res.json({message:'user created successfully'});
    }catch (err) {
        console.error(err);
        res.status(500).json({error:'Something went wrong'});
        
    }
 
});

router.post('/login' , async (req,res)=>{

    try {
        
        const {email , password} = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message:'Invalid credentials'})
        }
        
        const isMatch =  await bcrypt.compare(password , user.password)
          if(!isMatch){
            return res.status(400).json({message:'Invalid Credentials'})
          }

          const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
           console.log('JWT_SECRET :', process.env.JWT_SECRET) ,
            { expiresIn : '24h' }
        );

        res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email:user.email
            }
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({message:'something went wrong'})
        
    }
});

router.get('/profile', authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId).select('-password');
  console.log(user);
  res.json(user);
});

export default router;



