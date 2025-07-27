import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";


//thunk to set filters
export const fetchProductByFilter = createAsyncThunk("products/fetchByFilters",
    async({ 
        collection,
        size,
        color,
        gender,
        minPrice,
        maxPrice,
        category,
        sortBy,
        search,
        material,
        brand,
        limit
    })=>{
        const query = new URLSearchParams();
        if(collection) query.append("collections", collection);
        if(size) query.append("size",size);
        if(color) query.append("color", color);
        if(gender) query.append("gender",gender);
        if(minPrice) query.append("minPrice",  minPrice);
        if(maxPrice) query.append("maxPrice", maxPrice);
        if(category) query.append("category",category);
        if(sortBy) query.append("sortBy", sortBy);
        if(material) query.append("material", material);
        if(brand) query.append("brand", brand);
        if(limit) query.append("limit",limit);
        if(search) query.append("search",search);
    
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/?${query.toString()}`);
        return response.data;
    }
);

//thunk to fetch product details 
export const fetchProductDetails = createAsyncThunk("products/fetchProductDetails",
    async (id, { rejectWithValue})=>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


// thunk to update a product
export const updateProduct = createAsyncThunk("products/updateProduct", 
    async( {id, productData})=>{
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`, productData,
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            }
        );
        return response.data;   
    });

//thunk to fetch similar Products
export const fetchSimilarProducts  = createAsyncThunk("products/similarProducts", 
    async( id)=>{
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`);
        return response.data;
    }
);


//slice for the products
const productSlice = createSlice({
    name:"products",
    initialState :{
        products : [],
        similarProducts:[],
        selectedProduct: null,
        loading: false,
        error: null,
        filters:{
            category:"",
            size:'',
            color:'',
            gender :'',
            brand:"",
            minPrice:'',
            maxPrice:'',
            sortBy:'',
            search:'',
            material:'',
            collections:'',
        },
    },
    reducers:{
        setFilters:(state, action)=>{
            state.filters = {...state.filters, ...action.payload};
        },
        clearFilters:(state)=>{
            state.filters={
            category:"",
            size:'',
            color:'',
            gender :'',
            brand:"",
            minPrice:'',
            maxPrice:'',
            sortBy:'',
            search:'',
            material:'',
            collections:'',
            }
        },
    },
    extraReducers:(builder)=>{
        builder
        //handle fetchProductByFilter cases
        .addCase(fetchProductByFilter.pending,(state)=>{
            state.loading= true;
            state.error =  null;
        }  )
        .addCase(fetchProductByFilter.fulfilled, (state, action)=>{
            state.loading= false,
            state.products = Array.isArray(action.payload) ? action.payload : [];
        })
        .addCase(fetchProductByFilter.rejected, (state, action)=>{
            state.loading= false;
            state.error= action.error.message;
        })
        //handles fetchProductDetails cases 
        .addCase(fetchProductDetails.pending,(state)=>{
            state.loading= true;
            state.error =  null;
        }  )
        .addCase(fetchProductDetails.fulfilled, (state, action)=>{
            state.loading= false,
            state.selectedProduct =  action.payload;
        })
        .addCase(fetchProductDetails.rejected, (state, action)=>{
            state.loading= false;
            state.error= action.error.message;
        })
        //handles similar products cases
        .addCase(fetchSimilarProducts.pending,(state)=>{
            state.loading= true;
            state.error =  null;
        }  )
        .addCase(fetchSimilarProducts.fulfilled, (state, action)=>{
            state.loading= false,
            state.similarProducts = action.payload;
        })
        .addCase(fetchSimilarProducts.rejected, (state, action)=>{
            state.loading= false;
            state.error= action.error.message;
        })
        //handles updateProduct cases
        .addCase(updateProduct.pending,(state)=>{
            state.loading= true;
            state.error =  null;
        }  )
        .addCase(updateProduct.fulfilled, (state, action)=>{
            state.loading= false;
            const updatedProduct = action.payload;
            const index = state.products.findIndex((product)=>
            product._id === updateProduct._id);
            if( index > -1)
                state.products[index] = updatedProduct;
        })
        .addCase(updateProduct.rejected, (state, action)=>{
            state.loading= false;
            state.error= action.error.message;
        })
    },
});

export const { setFilters, clearFilters} = productSlice.actions;
export default productSlice.reducer;