const express  = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { protect } = require("../middleware/authMiddleware");


const router = express.Router();

//@router POST /api/users/register
//@desc Register a new user
//@access public
router.post("/register", async(req,res)=>{
    const {name, email, password}= req.body;

    try{
        let user = await User.findOne({email});

        if(user)
            return res.status(400).json({message:"User already exists!!"});

        user = new User({name, email, password});
        await user.save();

        //create JWT payload
        const payload = { user:{ id: user._id, role: user.role}};

        jwt.sign(payload, process.env.SECRET_KEY, { expiresIn:"40h"}, (err, token)=>{
            if(err) throw err;

            //send the user and token in response
            res.status(201).json({
                user: {
                    id: user._id,
                    name: user.name,
                    email : user.email,
                    role: user.role,
                },
                token,
            })
        });
    }catch(error){
        console.error(error);
        res.status(500).send("server error");
    }
});


//@route POST /api/users/login
//@desc Authenticate User
//@access Public
router.post("/login", async(req, res)=>{
    const {email, password} = req.body;
    try{
        let user = await User.findOne({email});

        if(!user)
            return res.status(400).json({message:"Invalid credentials"});

        const isMatch = await user.matchPassword(password);
        if(!isMatch)
            return res.status(400).json({message:"Invalid Credentials"});

        let payload = { user: { id: user._id, role: user.role}};

        jwt.sign( payload, process.env.SECRET_KEY, {expiresIn : "40h"}, (err, token)=>{
            if(err)
                throw err;
            res.status(201).json({
                user:{
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                token,
            })
        });
    } catch(err){
        res.status(500).json("Server Error");
    }
});


//@route GET /api/users/profile
//@desc get logged in user profile data 
//@access private
router.get("/profile", protect, async(req, res)=>{
    res.json(req.user);
});

module.exports = router;