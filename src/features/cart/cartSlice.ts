import { compareProducts } from '@/lib/compareProducts';
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
            state.cart = JSON.parse(JSON.stringify(action.payload));
            const cart = action.payload;
            let totalCartQuantity = 0;
            for (const product of cart) {
                totalCartQuantity += product?.cartQuantity;
            }
            state.totalItems = totalCartQuantity;
        },
        /* addToCart: (state, action: PayloadAction<{ product: Product, quantity: number; }>) => {
            const existingProductIndex = state.cart.findIndex((pd) => pd._id === action.payload.product._id);
            const product = JSON.parse(JSON.stringify(action.payload.product));

            const existingProduct = state.cart[existingProductIndex];
            const isSameProduct = compareProducts(product, existingProduct);

            if (existingProductIndex > -1) {

                if (isSameProduct) {
                    state.cart[existingProductIndex].cartQuantity += action.payload.quantity;
                } else {
                    state.cart.push(product);
                }

            } else {
                state.cart.push(product);
            }


            let totalItems = 0;
            for (let i = 0; i < state.cart.length; i++) {
                const cartQuantity = state.cart[i].cartQuantity;
                totalItems += cartQuantity;
            }
            state.totalItems = totalItems;
        }, */
        addToCart: (state, action: PayloadAction<{ product: Product, quantity: number; }>) => {

            let existingIndex = -1;
            for (let i = 0; i < state.cart.length; i++) {
                const existingProduct = state.cart[i];
                const isSame = compareProducts(existingProduct, action.payload.product);
                if (isSame) {
                    existingIndex = i;
                    break;
                }
            }

            const product = JSON.parse(JSON.stringify(action.payload.product));
            if (existingIndex > -1) {
                state.cart[existingIndex].cartQuantity += action.payload.quantity;
            } else {
                state.cart.push(product);
            }


            let totalItems = 0;
            for (let i = 0; i < state.cart.length; i++) {
                const cartQuantity = state.cart[i].cartQuantity;
                totalItems += cartQuantity;
            }
            state.totalItems = totalItems;
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            const productToRemove = state.cart.filter((pd) => pd.cartId === action.payload)[0];
            const quantityToRemove = productToRemove.cartQuantity;
            state.cart = state.cart.filter((pd) => pd.cartId !== action.payload);
            state.totalItems > 0 && (state.totalItems -= quantityToRemove);
        },
        increaseCart: (state, action: PayloadAction<string>) => {
            const productIndex = state.cart.findIndex((pd) => pd.cartId === action.payload);
            state.cart[productIndex].cartQuantity += 1;
            state.totalItems++;
        },
        decreaseCart: (state, action: PayloadAction<string>) => {
            const productIndex = state.cart.findIndex((pd) => pd.cartId === action.payload);
            if (state.cart[productIndex].cartQuantity > 1) {
                state.cart[productIndex].cartQuantity -= 1;
                state.totalItems--;
            }
        }
    },
});

export const { addToCart, setInitialCart, increaseCart, decreaseCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;