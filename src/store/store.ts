import { apiSlice } from '@/features/api/apiSlice';
import cartReducer from '@/features/cart/cartSlice';
import wishlistsReducer from '@/features/wishlists/wishlistsSlice';
import { configureStore } from '@reduxjs/toolkit';
export const store = configureStore({
    reducer: {
        wishlists: wishlistsReducer,
        cart: cartReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(apiSlice.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;