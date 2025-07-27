import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//thunk to fetch all users
export const fetchUsers = createAsyncThunk('admin/fetchUsers',
    async(_, {rejectWithValue})=>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//thunk to add users
export const addUser = createAsyncThunk('admin/addUser', 
    async(userData, {rejectWithValue})=>{
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`, userData,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            })
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    });

//thunk to update user
export const updateUser = createAsyncThunk("admin/updateUser", 
    async({id,name, email, role},{rejectWithValue})=>{
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,{name,email, role},{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const deleteUser = createAsyncThunk("admin/deleteUser", 
    async(id)=>{
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('userToken')}`
            }
        })
        return id;
    }
);


const adminSlice = createSlice({
    name:"admin",
    initialState:{
        loading: false,
        error:null,
        users:[]
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchUsers.pending, (state)=>{
            state.loading= false;
            state.error= null;
        })
        .addCase(fetchUsers.fulfilled, (state,action)=>{
            state.loading= false;
            state.users = action.payload;
        })
        .addCase(fetchUsers.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload.message;
        })
        .addCase(addUser.pending,(state)=>{
            state.loading = false;
            state.error = null;
        })
        .addCase(addUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.users.push(action.payload.user);
        })
        .addCase(addUser.rejected, (state, action)=>{
            state.loading= false;
            state.error = action.payload;
        })
        .addCase(updateUser.pending, (state)=>{
            state.loading = false;
            state.error = null;
        })
        .addCase(updateUser.fulfilled, (state,action)=>{
            state.loading= false;
            const updatedUser = action.payload;
            const index = state.users.findIndex((user)=> user._id === updatedUser._id);
            if(index > -1)
                state.users[index] = updatedUser;
        })
        .addCase(updateUser.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        })
        .addCase(deleteUser.fulfilled, (state, action)=>{
            state.loading = false;
            state.users = state.users.filter((user)=>user._id !== action.payload);
        })
    }
});

export default adminSlice.reducer;