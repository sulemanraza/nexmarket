import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WishlistState {
  items: any[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlistItems(state, action: PayloadAction<any[]>) {
      state.items = action.payload;
    },
    addItemToWishlist(state, action: PayloadAction<any>) {
      state.items.push(action.payload);
    },
    removeItemFromWishlist(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
  },
});

export const { setWishlistItems, addItemToWishlist, removeItemFromWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
