import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//thunk to fetch all orders
export const fetchAllOrders = createAsyncThunk("adminOrders/fetchAllOrders",
    async(_, {rejectWithValue})=>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        };
    }
);

//thunnk to update the order status
export const updateOrderStatus = createAsyncThunk("adminOrders/updateOrderStatus",
    async({id, status}, {rejectWithValue})=>{
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,{status},{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`
                },
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    });

//thun to delete an order
export const deleteOrder = createAsyncThunk("adminOrders/deleteOrder", 
    async(id, {rejectWithValue})=>{
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${id}`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("userToken")}`
                }
            });
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//slice for adminOrders
const adminOrderSlice = createSlice({
    name:"adminOrders",
    initialState:{
        orders:[],
        loading: false,
        error:null,
        totalOrders :0,
        totalSales: 0,
    },
    reducers:{},
    extraReducers: (builder)=>{
        builder
        //handle all cases of fetch all orders
        .addCase(fetchAllOrders.pending, (state)=>{
            state.loading = true;
            state.error=null;
        })
        .addCase(fetchAllOrders.fulfilled, (state, action)=>{
            state.loading = false;
            state.orders = action.payload;
            state.totalOrders = action.payload.length;
        })
        .addCase(fetchAllOrders.rejected, (state, action)=>{
            state.loading= false;
            state.error = action.payload.message;
        })
        //handle updates
        .addCase( updateOrderStatus.fulfilled, (state, action)=>{
            const updatedOrder = action.payload;
            const index = state.orders.findIndex((product)=> product._id === updatedOrder._id);
            if(index > -1)
                state.orders[index] = action.payload;
        })
        //handle delete order case
        .addCase(deleteOrder.fulfilled, (state, action)=>{
            state.orders = state.orders.filter((order) => order._id !== action.payload);
        })
    }
});
 export default adminOrderSlice.reducer;