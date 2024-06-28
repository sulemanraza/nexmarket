import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
}

interface WishlistState {
  items: WishlistItem[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<WishlistItem>) {
      const item = action.payload;
      if (!state.items.find((i) => i.id === item.id)) {
        state.items.push(item);
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearWishlist(state) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
