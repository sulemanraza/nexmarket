import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for cart items
interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
    // Add other necessary fields from the product model
  };
  quantity: number;
}

// Define a type for the slice state
interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

// Define the initial state using that type
const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;

      // Debugging logs
      console.log("Items set in cart:", state.items);

      state.totalItems = state.items.reduce(
        (acc, item) => acc + item.quantity,
        0
      );

      state.totalPrice = state.items.reduce((acc, item) => {
        console.log("Adding item to total price:", item);
        console.log(
          `Adding ${item.quantity} * ${item.product.price} to total price.`
        );
        return acc + item.quantity * item.product.price;
      }, 0);

      // Debugging logs
      console.log("Total Items:", state.totalItems);
      console.log("Total Price:", state.totalPrice);
    },
    updateTotalItems(state) {
      state.totalItems = state.items.reduce(
        (acc, item) => acc + item.quantity,
        0
      );

      state.totalPrice = state.items.reduce((acc, item) => {
        console.log(
          `Updating total price with ${item.quantity} * ${item.product.price}.`
        );
        return acc + item.quantity * item.product.price;
      }, 0);

      // Debugging logs
      console.log("Updated Total Items:", state.totalItems);
      console.log("Updated Total Price:", state.totalPrice);
    },
  },
});

export const { setCartItems, updateTotalItems } = cartSlice.actions;

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectTotalItems = (state: { cart: CartState }) =>
  state.cart.totalItems;
export const selectTotalPrice = (state: { cart: CartState }) =>
  state.cart.totalPrice;

export default cartSlice.reducer;
