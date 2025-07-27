const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productsRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require("./routes/OrderRoutes");
const  uploadRoutes = require("./routes/uploadRoutes");
const subscriberRoutes = require("./routes/subscriberRoute");
const adminRoutes = require("./routes/adminRoutes");
const adminProductsRoute = require("./routes/productAdminRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");


const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 3000;

//connect database
connectDB();

//api routes
app.get("/", (req,res)=>{
    res.send("WElcome to api!!");
});


app.use("/api/users",userRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/subscribe", subscriberRoutes);
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", adminProductsRoute);
app.use("/api/admin/orders", adminOrderRoutes);

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
});