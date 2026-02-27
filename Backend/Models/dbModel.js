const mongoose = require('mongoose');

const connectDB = process.env.MONGO_URI;

 mongoose.connect(connectDB)
 .then(()=>{
    console.log('MongoDB Connected Successfully');
 })
 .catch((err)=>{
    console.log('MongoDB Connection error: '+err);
 })

           