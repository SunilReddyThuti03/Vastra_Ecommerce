const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Products = require("./models/Products");
const Users = require("./models/User");
const products = require("./data/products");
const Cart = require("./models/Cart");

dotenv.config();

mongoose.connect( process.env.MONGO_URI);

const seeder = async()=>{
    try {
        await Products.deleteMany();
        await Users.deleteMany();
        await Cart.deleteMany();

        //create default admin
        const createUser = await Users.create({
            name: "admin",
            email:"admin@gmail.com",
            password : 1234567,
            role:"admin",
        });

        const userId = createUser._id;

        const sampleData = products.map((product)=>{
            return { ...product, user: userId};
        })

        await Products.insertMany(sampleData);
        console.log("products added successfully");
        process.exit();
    } catch (error) {
        console.error("Failed in adding the products", error);
        process.exit(1);
    }
};

seeder();