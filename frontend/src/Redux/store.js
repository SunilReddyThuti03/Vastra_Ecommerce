import { configureStore} from "@reduxjs/toolkit";
import authSlice from "./slices/AuthSlice";
import productSlice from "./slices/productSlice";
import cartSlice from "./slices/cartSlice";
import checkoutSlice from './slices/checkoutSlice';
import orderSlice from "./slices/orderSlice";
import adminSlice from "./slices/adminSlice";
import adminProductSlice from "./slices/adminProductsSlice";
import adminOrderSlice from './slices/adminOrderSlice';


const store = configureStore({
    reducer: {
        auth: authSlice,
        products: productSlice,
        cart : cartSlice,
        checkout: checkoutSlice,
        orders:orderSlice,
        admin: adminSlice,
        adminProducts: adminProductSlice,
        adminOrders : adminOrderSlice,
    },
});

export default store;
