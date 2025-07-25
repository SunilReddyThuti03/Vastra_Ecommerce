const mongoose = require("mongoose");

const checkoutItemSchema = new mongoose.Schema(
    {
        productId:{
            type : mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required: true,
        },
        name:{
            type: String,
            required: true,
        },
        image:{
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        size: String,
        color:String,
        qunatity: {
            type: Number,
            required: true,
        }
    },{ _id: false}
);

const checkoutSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true,
        },
        checkoutItems :[ checkoutItemSchema],
        shippingAddress:{
            address:{
                type: String,
                required: true,
            },
            city:{
                type: String,
                required: true,
            },
            postalCode:{
                type: String,
                required: true,
            },
            country:{
                type: String,
                required: true,
            }
        },
        paymentMethod:{
            type:String,
            required: true,
            default:"Paypal",
        },
        totalPrice:{
            type: Number,
            required: true,
        },
        isPaid:{
            type: Boolean,
            default: true,
        },
        paidAt:{
            type: Date,
        },
        paymentStatus:{
            type: String,
            default: "Pending",
        },
        paymentDetails:{
            type: mongoose.Schema.Types.Mixed,
        },
        isFinalised:{
            type: Boolean,
            default: false,
        },
        isFinalizedAt: Date,
    },{timestamps: true}
);

module.exports = mongoose.model("CheckOut", checkoutSchema);