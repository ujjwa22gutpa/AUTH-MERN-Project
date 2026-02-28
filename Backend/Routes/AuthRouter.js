const router = require('express').Router();
const { signupValidation, loginValidation } = require("../Middlewares/Authvalidation.js")
const {signup,login} = require("../Controllers/AuthControllers.js")


router.post('/signup',signupValidation,signup);
router.post('/login',loginValidation,login);

module.exports= router;