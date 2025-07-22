const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
    {
        productId : {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required:true,
        },
        name:{
            type: String,
            required: true,
        },
        image:{
            type:String,
            required: true,
        },
        quantity:{
            type: Number,
            required: true,
        },
        price:{
            type: Number,
            required: true,
        },
        size: String,
        color: String,
    },{ _id:false}
);

const orderSchema = mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true,
        },
        orderItems:[orderItemSchema],
        shippingAddress:{
            address:{ type: String, required: true},
            city:{ type: String, required: true},
            postalCode:{ type: String, required: true},
            country:{ type: String, required: true},
        },
        paymentMethod:{
            type:String,
            default: "Paypal",
            required: true,
        },
        totalPrice:{
            type:Number,
            required:true,
            default: 0,
        },
        isPaid:{
            type: Date,
        },
        isDelivered:{
            type: Boolean,
            default: false,
        },
        deliveredAt:{
            type: Date,
        },
        paymentStatus:{
            type: String,
            default:"pending",
        },
        status:{
            type: String,
            enum :[ "Processing","Shipped","Delivered","Cancelled"],
            default: "Processing",
        }},
    {timestamps:true});

    module.exports = mongoose.model("Order", orderSchema);