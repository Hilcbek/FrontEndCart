import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./User.Reducer";
import CartReducer from "./Cart.Reducer";
export default configureStore({
    reducer : {
        user : UserReducer,
        cart : CartReducer
    }
})