const router = require('express').Router();
const { signupValidation, loginValidation } = require("../Middlewares/Authvalidation.js")
const signup = require("../Controllers/AuthControllers.js")

router.post('/login',(req,res)=>{
     res.send('login successful!!!')
})

router.post('/signup',signupValidation,signup);

module.exports= router;