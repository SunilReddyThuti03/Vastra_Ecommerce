const express = require("express");
const Product = require("../models/Products");
const { protect, admin} = require("../middleware/authMiddleware");

const router = express.Router();

//@route GET /api/admin/products
//@desc get the lsit of products
//@access private
router.get("/", protect, admin, async(req, res)=>{
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json("server error");
    }
});

//@route delete /api/admin/products/:id
//@desc delete the product with the given id
//@access private
router.delete("/:id", protect, admin, async(req, res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if(product){
            await product.deleteOne();
            res.json({message:"The product deleted successfully"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"server error"});
    }
});


module.exports = router;