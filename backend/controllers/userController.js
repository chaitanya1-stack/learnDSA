const User= require('../models/User');
const jwt = require('jsonwebtoken');

const registerUser =async (req,res) =>{

    const {username, email, password} =req.body;

    try{
           const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }



        const user =await
        User.create({username, email, password});
        const token = jwt.sign({ id: user._id},
            process.env.JWT_SECRET,{expiresIn: '1d'});
           
       res.status(210).json({user, token});   

        
    } catch (err){
        res.status(400).json({error: err.message});   
    }
    
};


const loginUser= async(req,res)=> {
    const{email, password} = req.body;

    try{

        const user = await User.findOne({email: email.trim().toLowerCase()});
       
           if(!user) throw new Error('User not found');
           

           const isMatch =await
       require('bcryptjs').compare(password, user.password);
         if(!isMatch)  throw new 
         Error('Invalid credentials');
         
         

         const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{
            expiresIn: '1d'
         });

         res.json({user, token});
    } catch(err){


        res.status(400).json({error: err.message});
    }
};

module.exports = {registerUser, loginUser};