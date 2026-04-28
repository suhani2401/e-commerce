import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { CartData, CartItem, CartState } from '../../types';

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<CartData[]>) => {
            state.items = action.payload.flatMap(cart => cart.cart_items);
        },

        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existing = state.items.find(i => i.product_id === action.payload.product_id);
            if (!existing) {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },

        removeFromCart: (state, action: PayloadAction<{ cart_item_id: string }>) => {
            state.items = state.items.filter(i => i.id !== action.payload.cart_item_id);
        },

        updateQuantity: (state, action: PayloadAction<{ cart_item_id: string; quantity: number }>) => {
            const item = state.items.find(i => i.id === action.payload.cart_item_id);
            if (item) item.quantity = action.payload.quantity;
        },
    },
});

export const { setCart, addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;