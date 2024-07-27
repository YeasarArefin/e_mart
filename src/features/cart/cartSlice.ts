import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface CartState {
    cart: string[];
}

const initialState: CartState = {
    cart: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setInitialCart: (state, action: PayloadAction<string[]>) => {
            state.cart = action.payload;
        },
        toggleCart: (state, action: PayloadAction<string>) => {
            const exists = state.cart.includes(action.payload);
            if (exists) {
                state.cart = state.cart.filter(id => id !== action.payload);
            } else {
                state.cart.push(action.payload);
            }
        }
    },
});

export const { toggleCart, setInitialCart } = cartSlice.actions;
export default cartSlice.reducer;