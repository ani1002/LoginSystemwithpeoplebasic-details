const dotenv = require("dotenv");
const express = require('express');
const mongoose = require('mongoose');
require("../connect/connect");
const jwt = require('jsonwebtoken');
const router = express.Router();
const bodyParser = require('body-parser'); // Import the body-parser middleware
const  user = require("../sechma/userSchema");
const bcrypt = require('bcryptjs');
dotenv.config({path: './config.env' });



// Use body-parser middleware to parse request bodies
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    res.send('Hello, I am running');
});


  
    // Create an instance of the User model using mongoose.model
    router.post("/register", async (req, res) => {
      //console.log(req.body);
    
      const { first_name, last_name, street, address, city, state,email,phone,password } = req.body;
    
      if (!first_name || !last_name || !street || !address || !city || !state || !email|| !phone || !password) {

        return res.status(422).json({ error: "Please check the input." });
      }
    try{
      const userExist = await user.findOne({ email: email });

    if (userExist) {
      //console.log("This user already exists");
      return res.status(422).json({ error: "Email already in use" });
    }

    const User = new user({ first_name, last_name, street, address, city, state,email,phone,password });
//password hashing 



    const userRegister = await User.save();

    if (userRegister) {
      res.status(201).json({ message: "Registration complete" });
    } else {
      res.status(500).json({ error: "Data couldn't be saved in the database" });
    }
  }
  catch(err){
    console.log(err);
  }
  
});


    router.post ('/signin', async (req,res)=>{
      
      try{
         const {email,password} = req.body;
          if(!email ||!password){
            return res.status(400).json({error: "plz check it"});
          }

          const userLogIn = await user.findOne({email:email});

          if(userLogIn){
            const isMatch = await bcrypt.compare(password,userLogIn.password);
           const token =  await userLogIn.generateAuthToken();
            res.cookie("jwtoken",token,{
              expires: new Date(Date.now() + 604800000),//7 days expires cookies
              httpOnly:true
            })
            if(!isMatch) {
              return res.status(400).json({error: "Invalid Details"});
            }
            else {
              res.json({error: "Userlogin succesfully"});
            }
          }
          else {
            return res.status(400).json({error: "Invalid Details"});
            }
          }
        
      catch(err){
        console.log(err);
      }
        
    })
    

module.exports = router; // Correct the export statement