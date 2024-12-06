import { createSlice } from '@reduxjs/toolkit'
import Swal from 'sweetalert2';
const initialState = {
    cartItem:[]
}
const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const existingItem = state.cartItem.find(item => item._id===action.payload._id)
            if(!existingItem){
                state.cartItem.push(action.payload)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Product added to Cart",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
            else{
                Swal.fire({
                    title: "Already Added to Cart",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Okay"
                  })
            }
        },
        removeFromCart:(state,action)=>{
            state.cartItem = state.cartItem.filter(item => item._id!== action.payload._id)
        },
        clearCart:(state)=>{
            state.cartItem = []
        }
    }
})

export const {addToCart,removeFromCart,clearCart}= cartSlice.actions;
export default cartSlice.reducer;
