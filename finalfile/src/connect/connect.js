const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/susovanloginsystem",{
    useNewUrlParser :true,
    useUnifiedTopology:true,
   // useCreateIndex:true
}).then(()=>{
    console.log("Connection Succesful");
}).catch((e)=>{
    console.log(e);
})