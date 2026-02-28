const router = require('express').Router();
const ensureValidation = require('../Middlewares/ProductValidation')



router.get('/products',ensureValidation ,(req,res)=>{
    console.log("-------User Data-----"+"  "+ req.user)
    res.status(200).json([{
        name:"T.V.",
        price:14000
    },
    {
        name:"Fridge",
        price:15000
    }
])
});

module.exports= router;