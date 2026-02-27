const UserModel = require("../Models/UserModel");
const bcryt = require('bcrypt');

const  signup = async (req,res)=>{
      try {
          const {name,email,password} = req.body;
        const user  = await UserModel.findOne({email});

        if(user){
            return res.status(409).
            json({
                message:"User already existed, you can login",
                success:false
            })
        }

        const userModel = new UserModel({name,email,password}); 
        userModel.password = await bcryt.hash(password,10);
        await userModel.save();
        res.status(200).
        json({
            message:"sign up successfull",
            success:true
        })
      } catch (error) {
            return res.status(500).
            json({
                message:"Internal server problem",
                success:false
            })
      }
}

module.exports = signup;