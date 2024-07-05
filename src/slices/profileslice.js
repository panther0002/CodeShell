import {createSlice} from "@reduxjs/toolkit";


const initialState={
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null, //problem ese6ilo
    loading: false,
}

const profileslice=createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setUser(state,value){
            state.user=value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
    },
});

export const {setUser,setLoading} = profileslice.actions;
export default profileslice.reducer;