import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


//thunk to fetch admin products
export const fetchAdminProducts = createAsyncThunk('adminProducts/fetchAdminProducts',
    async(_, {rejectWithValue})=>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("userToken")}`
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//thunk to delete product
export const deleteProduct = createAsyncThunk("adminProducts/deleteProduct",
    async(id)=>{
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products/${id}`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        });
        return id;
    });

    //thunk to create new product
export const createProduct = createAsyncThunk('adminProducts/createProduct',
    async(productData) =>{
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products`, productData,
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("userToken")}`
                }
            }
        );
        return response.data;
    });

export const updateProduct = createAsyncThunk('adminProducts/updateProduct',
    async({id, productData}) =>{
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products/${id}`, productData,
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("userToken")}`
                }
            }
        );
        return response.data;
    });


const adminProductSlice = createSlice({
    name:"adminProducts",
    initialState:{
        loading:false,
        error:null,
        products:[],
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAdminProducts.pending, (state)=>{
            state.loading = true;
            state.error= null;
        })
        .addCase(fetchAdminProducts.fulfilled,(state, action)=>{
            state.products = action.payload;
            state.loading= false;
        })
        .addCase(fetchAdminProducts.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        })
        .addCase(deleteProduct.fulfilled, (state,action)=>{
            state.products = state.products.filter((product)=> product._id === action.payload);
            state.loading= false;
        })
        .addCase(createProduct.fulfilled,(state, action)=>{
            state.products.push(action.payload);
        })
        .addCase(updateProduct.fulfilled, (state, action)=>{
            const index = state.products.findIndex((product)=> product._id === action.payload);
            if(index > -1)
                state.products[index] = action.payload;
        })
    }
});
export default adminProductSlice.reducer;