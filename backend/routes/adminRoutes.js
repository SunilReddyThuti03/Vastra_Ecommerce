const express = require("express");
const Users  = require("../models/Users");
const { protect, admin} = require("../middleware/authMiddleware");

const router = express.Router();

//@route GET /api/admin/users
//@desc get all users admin only request
//@access private admin
router.get("/", protect, admin, async(req, res)=>{
    try {
        const users = await Users.find({});
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"server Error"});
    }
});

//@route Post /api/admin/users
//@desc Add a new user
//@access private admin
router.post("/", protect, admin, async(req, res)=>{
    const { name, email, password, role} = req.body;
    try {
        const userEmail = await Users.findOne({email});
        if(userEmail)
            return res.status(400).json({message: "User already exists"});

        const user = new Users({name, email, password, role});
        await  user.save();
        res.status(201).json({user});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"SERVER ERROR"});
    }
});

//@route PUT /api/admin/users
//@desc Updating the role of the customer
//@access private
router.put("/:id", protect, admin, async(req, res)=>{
    try {
        const user = await Users.findById(req.params.id);
        if(user){
            user.name = req.body.name || user.name;
            user.email = req.body.email ||  user.email;
            user.role = req.body.role || user.role;
        }
        const updatedUser = await user.save();
        return res.json(updatedUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Server error"});
    }
});

//@route DELETE /api/admin/user/:id
//@desc deelete a user 
//@acccess private
router.delete("/:id", protect, admin, async(req, res)=>{
    try {
        const user = await Users.findById(req.params.id);
        if(user){
            await user.deleteOne();
            res.json({message:"user account delted successfully"});
        } else {
            return res.status(400).json({message:"User not found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server error"});
    }
});

module.exports = router;