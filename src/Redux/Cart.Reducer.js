import { createSlice } from "@reduxjs/toolkit";
export let CartSlice = createSlice({
    name : 'cart',
    initialState : {
        product : [],
        quantity : 0,
        total : 0,
        show : false,
        Fetcher : false
    },
    reducers : {
        AddToCart : (state,action) => {
            state.quantity += 1
            state.show = action.payload
        },
        setClose : (state,action) => {
            state.show = action.payload.show
        },
        setFetcher : (state,action) => {
            state.Fetcher = action.payload.active
        }
    }
})
export let {AddToCart,setClose,RemoveProduct,setFetcher} = CartSlice.actions;
export default CartSlice.reducer;