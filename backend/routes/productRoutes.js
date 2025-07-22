const express = require("express");
const Product = require("../models/Products");
const { protect, admin } = require("../middleware/authMiddleware");
const { validateMongoDBId} = require("../middleware/validateMongodbid");
const { validate } = require("../models/User");


const router = express.Router();

//@router POST /api/product
//@desc adding new products to the list
//@access private
router.post("/", protect, admin, async(req, res)=>{
    try {
        const { name, description, price, discountPrice, countInStock, brand,
            sizes, colors, collections, material, gender, images, isFeatured, 
            isPublished, tags, dimenstions, weight, sku, category 
        } = req.body;

        const product = new Product({
            name, description, price, discountPrice, countInStock, brand,
            sizes, colors, collections, material, gender, images, isFeatured, 
            isPublished, tags, dimenstions, weight, sku, category,user: req.user._id
        })

        const createProduct = await product.save();
        res.status(201).json(createProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send("server error");
    }
});

//@route put /api/product/:id
//@desc updating a product using :id
//@access private
router.put("/:id", validateMongoDBId, protect, admin, async(req, res)=>{
     const { name, description, price, discountPrice, countInStock, brand,
            sizes, colors, collections, material, gender, images, isFeatured, 
            isPublished, tags, dimenstions, weight, sku, category 
        } = req.body;

        try {
            const product = await Product.findById(req.params.id);

            if(product){
                product.name = name || product.name;
                product.description = description || product.description;
                product.price = price || product.price;
                product.discountPrice = discountPrice || product.discountPrice;
                product.countInStock = countInStock || product.countInStock;
                product.brand  = brand || product.brand;
                product.sizes = sizes || product.sizes;
                product.colors = colors || product.colors;
                product.collections = collections || product.collections;
                product.material = material ||product.material;
                product.gender = gender || product.gender;
                product.images = images || product.images;
                product.isFeatured = isFeatured || product.isFeatured;
                product.isPublished = isPublished || product.isPublished;
                product.tags = tags || product.tags;
                product.dimensions = dimenstions || product.dimensions;
                product.weight = weight || product.weight;
                product.sku = sku || product.sku;
                product.category = category || product.category;
                product.user  = req.user._id;
                const updatedProduct = await product.save(); 
                
                res.json(updatedProduct);

            }
            else {
                res.status(404).json({message:"product not found"});
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("server error");
        }
});

//@route DELETE /api/product/:id
//@route delete the product by id
//@access private
router.delete("/:id", validateMongoDBId, protect, admin, async(req, res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if(product){
            await product.deleteOne();
            res.json({message:"Product Removed"});
        } else {
            res.status(404).json({message:"Product not found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("server error");
    }
});


//@route get /api/prodcut 
//@route get all prodcuccts 
//@access public 
router.get("/", async(req,res)=>{
    try {
        const { collection, size, color, gender, minPrice, maxPrice, sortBy, search, category, material, brand, limit} = req.query;

        let query = {};

        if(collection && collection.toLocaleLowerCase()!=="all")
            query.collection = collection;
        if(category && category.toLocaleLowerCase()!== "all")
            query.category = category;
        if(material)
            query.material;
        if(brand)
            query.brand = brand;
        if(size)
            query.size = size;
        if(color)
            query.color = color;
        if(gender)
            query.gender = gender;

        if(minPrice || maxPrice){
            query.price={};
            if(minPrice ) query.price.$gte = Number(minPrice);
            if(maxPrice) query.price.$lte = Number(maxPrice);
        }

        if(search){
            query.$or=[
                {name: {$regex : search, $options: "i"}},
                //{ description :{ $regex: search, $options:"i"}};
            ];
        }

        let sort= {};
        if(sortBy){
            switch(sortBy){
                case "priceAsc":
                    sort = { price: 1, _id: 1};
                    break;
                
                case "priceDesc":
                    sort = { price : -1, _id: 1};
                    break;
                
                case "popularity":
                    sort= { rating : -1, _id: 1};
                    break;
                default:
                    break;
            }
        }
        
        let products = await Product.find(query).sort(sort).limit(Number(limit)||0);
        res.json(products);
    } catch (error) {
        res.status(500).send("Server Error");
    }
});


//@route GET /api/Product/best-seller
//@desc get the procut with top rating
//@access Public
router.get("/best-seller", async( req, res)=>{
    try {
        const product = await Product.findOne().sort({ rating : -1});

        if(product){
            res.json(product);
        } else {
            res.status(400).send("No product Found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("server error");
    }
});


//@route GET /api/products/new-arrivals
//@desc get thelatest created product 
//@access publicc
router.get("/new-arrivals", async(req, res)=>{
    try {
        const new_arrivals = await Product.find().sort({ createdAt: -1}).limit(8);

        if(new_arrivals)
            res.json(new_arrivals);
        else
            res.status(400).send("No arrivals found");
    } catch (error) {
        console.error(error);
        res.status(500).send("server error");
    }
});

//@route GET /api/product/:id
//@desc GET the data of a specific product
//@access public
router.get("/:id", validateMongoDBId, async (req, res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if(product )
                res.json(product);
        else
            res.status(400).send("Product not found");
    } catch (error) {
        res.status(500).send("server error");
    }
} );


//@route GET /api/products/similar/:id
//@desc get similar products category and gender
//@access public 
router.get("/similar/:id", validateMongoDBId, async(req, res)=>{
    try {
        const { id} = req.params;
        const product = await Product.findById(id);
        if(product){
            const {category, gender}= product;
            const similarProducts = await Product.find(
                {_id: {$ne : id}, category: product.category, gender: product.gender}
            ).limit(4);

            res.json(similarProducts);
        } else {
            res.status(400).send("product not found");
        }
    } catch (error) {
        res.status(500).send("server error");
    }
});

module.exports = router;``