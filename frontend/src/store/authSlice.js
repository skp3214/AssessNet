import {createSlice} from "@reduxjs/toolkit";

const initialState={
    status:false,
    user:null
}

const authSlice=createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        login:(state,action)=>{
            state.status=true;
            state.user=action.payload;
        },
        signup:(state,action)=>{
            state.status=true;
            state.user=action.payload;
        },
        logout:(state,action)=>{
            state.status=false;
            state.user=null;
        }
    }
})

export const {login,logout,signup}=authSlice.actions;
export default authSlice.reducer;