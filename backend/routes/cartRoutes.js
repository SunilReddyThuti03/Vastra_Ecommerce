const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Products");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

//helper funciton to geta cart either of user or guest
const getCart = async ( userId, guestId)=>{
    if(userId){
        return await Cart.findOne({user: userId});
    } else if(guestId){
        return await Cart.findOne({guestId});
    } else {
        return null;
    }
};

//@route Post /api/cart
//@desc adding item to cart
//@access public
router.post("/", async(req, res)=>{
    const { productId,  quantity, size, color, userId, guestId} = req.body;
    try {
        
        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({message:"Product not Found"});
        }
        let cart = await getCart(userId, guestId);
        
        if(cart){
            const productIndex = cart.products.findIndex(
                (p)=> p.productId.toString() === productId && p.size === size && p.color === color);
            
            if(productIndex > -1){
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price : product.price,
                    color: color,
                    size:size,
                    quantity : quantity,
                });
            }
            //total price 
            cart.totalPrice = cart.products.reduce((acc,item)=> acc + item.quantity * item.price, 0);
            await cart.save();
            return res.status(200).json(cart);
        } else {
            const newCart = await Cart.create({
                user : userId ? userId : undefined,
                guestId : guestId  ? guestId : "guest_"+ new Date().getTime(),
                products:[{
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price : product.price,
                    color: color,
                    size:size,
                    quantity : quantity,
                },],
                totalPrice: product.price * quantity,
            });
            return res.status(201).json(newCart);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"server error"});
    }
});


//@route PUT /api/cart
//@desc update the quantity of the product in the cart
//@access public
router.put("/", async(req, res)=>{
    const { productId, quantity, color, size,guestId, userId} = req.body;
    try {
        let cart = await getCart(userId, guestId);
        if(!cart){
            return res.status(400).json({message:"no cart found!!"});
        }
        const productIndex = cart.products.findIndex((p)=>
        p.productId.toString() === productId && 
        p.size === size && 
        p.color === color   );

        if(productIndex > -1){
            if(quantity > 0){
                cart.products[productIndex].quantity = quantity;
            } else {
                cart.products.splice(productIndex,1);
            }
            cart.totalPrice = cart.products.reduce((acc,item)=> acc+ item.price * item.quantity,0);
            await cart.save();
            return res.status(200).json(cart)
        } else {
            return res.status(404).json({message:"Product not found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
});

//@route DELETE /api/cart/:id
//@desc delete the selected item from the cart
//@accesss public 
router.delete("/", async(req, res)=>{
    const { productId,size, color, guestId, userId} = req.body;
    try {
        let cart = await getCart(userId, guestId);
        if(!cart)
            return res.status(404).json({message:"No cart found"});

        const productIndex = cart.products.findIndex((p)=>p.productId.toString() === productId &&
    p.size === size && p.color === color);
    if(productIndex > -1){
        cart.products.splice(productIndex,1 );
        cart.totalPrice = cart.products.reduce((acc, item)=>  acc+ item.price * item.quantity,0);
        await cart.save();
        return res.status(200).json(cart);
    } else    {
        return res.status(404).json({message:"product not found in cart"});
    }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"server error"});
    }
});

//@route GET /api/cart
//@desc display the cart
//@acccess public 
router.get("/", async( req, res)=>{
    const { userId, guestId} = req.query;
    try{
        let cart = await getCart(userId, guestId);
        if(!cart )
            return res.status(200).json({message:"user Has no cart"});
        res.status(200).json(cart);
    } catch(error){
        console.error(error);
        res.status(500).json({message:"server error"});
    }
});

//@route POST /api/cart/merge
//@desc merging the guest cart into user cart
//@access private
router.post("/merge", protect, async(req, res)=>{
    const {guestId} = req.body;
    try {
        const guestCart = await Cart.findOne({guestId});
        const userCart = await Cart.findOne({user: req.user});
        if(guestCart){
            if(guestCart.products.length === 0)
                return res.status(404).json({message:"Guest cart has no products"});
            
            if(userCart){
                guestCart.prroducts.forEach((guestItem)=>{
                    const productIndex = userCart.products.findIndex(
                        (userItem)=> userItem.productId.toString() === guestItem.productId.toString() &&
                        userItem.size === guestItem.size &&
                        userItem.color === guestItem.color
                    );
                    if(productIndex > -1){
                        userCart.products[productIndex].quantity  += guestItem.quantity;
                    } else {
                        userCart.products.push(guestItem);
                    }
                });

                userCart.totalPrice = userCart.products.reduce((acc,item)=>acc + item.quantity * item.price, 0);
                await userCart.save();

                try {
                    await Cart.findOneAndDelete({guestId});
                } catch (error) {
                    console.error("Error deleting Guest cart!", error);
                }
                res.status(200).json(userCart);
            } else {
                guestCart.user = req.user._id;
                guestCart.guestId = undefined;
                await guestCart.save();
                res.status(200).json(guestCart);
            }
        } else {
            if(userCart){
                return res.status(200).json(userCart);
            }
            res.status(404).json({message:"No guest cart found"});
            return;
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
});

module.exports  = router;