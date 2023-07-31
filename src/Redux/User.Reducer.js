import { createSlice } from "@reduxjs/toolkit";

export let UserSlice = createSlice({
    name : "user",
    initialState : {
        name : JSON.parse(localStorage.getItem("username")) || null,
        profile :  JSON.parse(localStorage.getItem("profile")) || null,
        isAdmin : JSON.parse(localStorage.getItem("isAdmin")) || null
    },
    reducers : {
        LOGIN : (state,action) => {
            state.username = action.payload.username
            state.profile = action.payload.profile
            state.isAdmin = action.payload.isAdmin
            localStorage.setItem("username",JSON.stringify(action.payload.username))
            localStorage.setItem("profile",JSON.stringify(action.payload.profile))
            localStorage.setItem("isAdmin",JSON.stringify(action.payload.isAdmin))
        },
        LOGOUT : () => {
            localStorage.clear()
        }
    }
})
export let { LOGIN, LOGOUT } = UserSlice.actions;
export default UserSlice.reducer;