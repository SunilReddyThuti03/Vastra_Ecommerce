const express = require("express");
const Orders = require("../models/Order");
const { protect, admin} = require("../middleware/authMiddleware");

const router = express.Router();

//@route GET /api/admin/orders
//@desc Get all the orders
//@access private
router.get("/", protect, admin, async(req, res)=>{
    try{
        const orders = await Orders.find({}).populate("user","name email");
        res.json(orders);
    } catch(error){
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
});

//@route PUT /api/admin/orders
//@desc update the order status
//@access private
router.put("/:id", protect, admin, async(req, res)=>{
    try {
        const order = await Orders.findById(req.params.id).populate("user", "name email");
        console.log(req.body.status);
        if(order){
            order.status = req.body.status || order.status;
            order.isDelivered = req.body.status === "Delivered" ? true:order.isDelivered;
            order.deliveredAt = req.body.status === "Delivered" ? Date.now() : order.deliveredAt;

            const updateOrder = await order.save();
            res.json(updateOrder);
        } else {
            return res.status(400).json({message: "order not found"});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Server error"});
    }
});

//@route DELETE /api/admin/order/:id
//@desc delete an order
//@access private
router.delete("/:id", protect, admin, async(req, res)=>{
    try {
        const order = await Orders.findById(req.params.id);
        if(order){
            await order.deleteOne();
            res.json({message:"Order Deleted Successfully"});
        } else {
            res.status(400).json({message:"Order Not Found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
})

module.exports = router;