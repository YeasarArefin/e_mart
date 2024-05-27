import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface WishlistsState {
    wishlists: string[];
}

const initialState: WishlistsState = {
    wishlists: []
};

const wishlistsSlice = createSlice({
    name: 'wishlists',
    initialState,
    reducers: {
        setInitialWishlists: (state, action: PayloadAction<string[]>) => {
            state.wishlists = action.payload;
        },
        toggleWishlists: (state, action: PayloadAction<string>) => {
            const exists = state.wishlists.includes(action.payload);
            if (exists) {
                state.wishlists = state.wishlists.filter(id => id !== action.payload);
            } else {
                state.wishlists.push(action.payload);
            }
        }
    },
});

export const { toggleWishlists, setInitialWishlists } = wishlistsSlice.actions;
export default wishlistsSlice.reducer;