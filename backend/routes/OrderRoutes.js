const express = require("express");
const Order = require("../models/Order");
const {protect } = require("../middleware/authMiddleware");

const router = express.Router();

//@route GET /api/order/myorders
router.get("/myorders", protect, async(req, res)=>{
    try {
        const orders = await Order.find({user: req.user._id}).sort({createdAt:-1});
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server error"});
    }
});

//@route GET /api/order/:id
//desc GET order with id
//@access private
router.get("/:id", protect, async(req, res)=>{
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email");
        if(!order)
            return res.status(404).json({message:"No orders found"});
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"server error"});
    }
});

module.exports = router;
