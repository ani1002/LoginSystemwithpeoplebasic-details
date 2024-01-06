const dotenv =  require("dotenv");
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
dotenv.config({path: './config.env' });
const secretKey = process.env.SECRET_KEY || 'default-secret-key';


const susovanSchema = new mongoose.Schema({
    first_name:{
        type:String,
        require:true
    },
    last_name:{
        type:String,
        require:true
    },
    street:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    state:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
   tokens:[
    {
        token:{
            type:String,
            require:true
        }
   }
   ]

})




// we are hashing password 

susovanSchema.pre('save',async function (next) {
           if(this.isModified('password')) {
            this.password = await  bcrypt.hash(this.password,12);
        }
        next();
});
//we geberate token 
susovanSchema.methods.generateAuthToken = async function () {
    try {
   let token = jwt.sign({_id:this._id},secretKey);//I have to create a env file for storing the data
    this.tokens = this.tokens.concat({token:token});
    await this.save() ;
     return token;   
}
    catch (err){
  console.log(err);
    }
 }

const user = new mongoose.model('user',susovanSchema);
module.exports= user;