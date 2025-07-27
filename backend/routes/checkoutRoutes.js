const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const CheckOut = require("../models/CheckOut");
const Order = require("../models/Order");
const Cart = require('../models/Cart');

const router = express.Router();

//@route POST /api/checkout
//@desc creating a new checkout session
//@access private
router.post("/", protect, async(req, res)=>{
    const {checkoutItems, shippingAddress, paymentMethod, totalPrice}= req.body;
    if(!checkoutItems || checkoutItems.length===0){
        return res.status(400).json({message:"No items in checkout"});
    }
    try {
        const newCheckout  = await CheckOut.create({
            user: req.user._id,
            checkoutItems: checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus:"Pending",
            isPaid: false,
        });
        console.log(`checkout created for user: ${req.user._id}`);
        res.status(201).json(newCheckout);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server error"});
    }
});


//@route PUT api/:id/pay
//@descc update checkout to mark as paid aafter successful payment
//@access private
router.put("/:id/pay", protect, async(req,res)=>{
    const { paymentStatus, paymentDetails} = req.body;

    try {
        const checkout = await CheckOut.findById(req.params.id);
        if(!checkout){
            return res.status(404).json({message:"Checkout not found"});
        }

        if(paymentStatus==="isPaid"){
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails = paymentDetails;
            checkout.paidAt = Date.now();
            await checkout.save();

            res.status(200).json(checkout);
        } else {
            res.status(400).json({message:"invalid payment Status"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server error"});
    }
});


//@route POST /api/checkout/:id/finalize
//@desc Finalize checkout and convert to an order after payment confirmation
//@access private
router.post("/:id/finalize", protect, async(req, res)=>{
    try {
        const checkout = await CheckOut.findById(req.params.id);

        if(!checkout){
            return res.status(404).json({message:" checkout not found"});
        }

        if(checkout.isPaid && !checkout.isFinalised){
            console.log("reached");
            const finalOrder = await Order.create({
                user: checkout.user,
                orderItems: checkout.checkoutItems,
                shippingAddress : checkout.shippingAddress,
                paymentMethod : checkout.paymentMethod,
                totalPrice: checkout.totalPrice,
                isPaid : true,
                paidAt: checkout.paidAt,
                isDelivered: false,
                paymentStatus: "paid",
                paymentDetails:checkout.paymentDetails,
            });
            checkout.isFinalised = true;
            checkout.isFinalizedAt = Date.now();
            await checkout.save();
            
            await Cart.findOneAndDelete({user: checkout.user});
            res.status(201).json(finalOrder);
        } else if(checkout.isFinalised){
            res.status(400).json({message:"checkout already finalised"});
        } else {
            res.status(400).json({message:"checkout is not paid"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"server error"});
    }
});

module.exports = router;