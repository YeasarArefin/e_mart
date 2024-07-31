import { Product } from '@/types/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface CartState {
    cart: Product[];
    totalItems: number;
}

const initialState: CartState = {
    cart: [],
    totalItems: 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setInitialCart: (state, action: PayloadAction<Product[]>) => {
            console.log("🚀 ~ action:", action.payload);
            state.cart = JSON.parse(JSON.stringify(action.payload));
            const cart = action.payload;
            let totalCartQuantity = 0;
            for (const product of cart) {
                totalCartQuantity += product?.cartQuantity;
            }
            state.totalItems = totalCartQuantity;
        },
        addToCart: (state, action: PayloadAction<Product>) => {
            const product = state.cart.filter((pd) => pd._id === action.payload._id)[0] as Product;
            const clonedProduct = JSON.parse(JSON.stringify(action.payload));
            if (product) {
                product.cartQuantity += 1;
            } else {
                state.cart.push(clonedProduct);
            }
            state.totalItems++;
        },
        increaseCart: (state, action: PayloadAction<string>) => {
            const productIndex = state.cart.findIndex((pd) => pd._id === action.payload);
            state.cart[productIndex].cartQuantity += 1;
            state.totalItems++;
        },
        decreaseCart: (state, action: PayloadAction<string>) => {
            const productIndex = state.cart.findIndex((pd) => pd._id === action.payload);
            if (state.cart[productIndex].cartQuantity > 1) {
                state.cart[productIndex].cartQuantity -= 1;
                state.totalItems--;
            }
        }
    },
});

export const { addToCart, setInitialCart, increaseCart, decreaseCart } = cartSlice.actions;
export default cartSlice.reducer;