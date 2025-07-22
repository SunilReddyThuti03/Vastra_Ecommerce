const express = require("express");
const Subscriber = require("../models/Subscriber");

const router = express.Router();

//@router Post /api/subscribe
//@desc handle subscription of the users
//@access public 
router.post("/", async(req, res)=>{
    const { email } = req.body;

    if(!email)
        return res.status(400).json({message:"Email is required"});

    try {
        let subscriber = await Subscriber.findOne({ email });
        if(subscriber){
            return res.status(400).json({message:"User already subscribed!!"});
        }

        subscriber = new Subscriber({ email });
        await subscriber.save();
        res.status(201).json({message: "Successfully subscribed to newletter"})
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
});

module.exports = router;