import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "./AuthSlice";

const saveCartToStorage = (cart)=>{
    localStorage.setItem("cart", JSON.stringify(cart));
}

//thunk to fetch cart
export const fetchCart = createAsyncThunk('cart/fetchCart',
    async({userId, guestId}, {rejectWithValue})=>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                { params:{ userId, guestId},}
            )
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.message?.data?.message);
        }
    }
);

//adding products to the cart
export const addToCart = createAsyncThunk("cart/addToCart", 
    async({productId, quantity, size, color, guestId, userId}, {rejectWithValue})=>{
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                {productId, quantity, size, color, userId, guestId}
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//update the quantity of the product in cart
export const updateQuantity = createAsyncThunk("cart/updateQuantity",
    async({userId, guestId, productId, quantity, size, color}, {rejectWithValue})=>{
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                {userId, productId, guestId, size, color, quantity}
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//delete item from a cart
export const removeItemFromCart = createAsyncThunk("cart/removeItemFromCart",
    async({productId, size, color, userId, guestId}, {rejectWithValue})=>{
        try {
            const response = await axios({
                method:"DELETE",
                url:`${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                data:{ productId, size, color, userId,guestId}
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//merge carts
export const mergeCart = createAsyncThunk("cart/mergeCart",
    async(guestId, {rejectWithValue})=>{
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
                {guestId},{
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//cartslice

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        cart: JSON.parse(localStorage.getItem('cart')),
        error: null,
        loading: false,
    },
    reducers:{
        clearCart:(state)=>{
            state.cart ={products:[]};
            localStorage.removeItem('cart');
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchCart.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchCart.fulfilled, (state,action)=>{
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(action.payload);
        })
        .addCase(fetchCart.rejected, (state, action)=>{
            state.loading = true;
            state.error = action.error.message;
        })
        .addCase(addToCart.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(addToCart.fulfilled, (state, action)=>{
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(action.payload);
        })
        .addCase(addToCart.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload?.message;
        })
        .addCase(updateQuantity.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(updateQuantity.fulfilled, (state,action)=>{
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(action.payload);
        })
        .addCase(removeItemFromCart.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(removeItemFromCart.fulfilled, (state, action)=>{
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(action.payload);
        })
        .addCase(removeItemFromCart.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload?.message;
        })
        .addCase(mergeCart.pending, (state)=>{
            state.loading = true;
            state.error =null;
        })
        .addCase(mergeCart.fulfilled, (state, action)=>{
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(action.payload);
        })
        .addCase(mergeCart.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload?.message;
        })
    }
});
export const {clearCart} = cartSlice.actions;
export default cartSlice.reducer;