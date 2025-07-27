import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserOrders = createAsyncThunk("orders/fetchUserOrders",
    async(_ , { rejectWithValue })=>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/myorders`,
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`
                    }
                })
        return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchDetailsById = createAsyncThunk('orders/fetchDetailsById',
    async(id, {rejectWithValue})=>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${id}`,
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`
                    }
                })
                return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    });

const orderSlice = createSlice({
    name:"orders",
    initialState:{
        orders:[],
        orderDetails: null,
        totalOrders:0,
        loading: false,
        error: null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchUserOrders.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchUserOrders.fulfilled, (state, action)=>{
            state.loading = false;
            state.orders = action.payload;
        })
        .addCase(fetchUserOrders.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload.message;
        })
        .addCase(fetchDetailsById.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchDetailsById.fulfilled, (state,action)=>{
            state.loading = false;
            state.orderDetails = action.payload;
        })
        .addCase(fetchDetailsById.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload.message;
        })
    }
});

export default orderSlice.reducer;