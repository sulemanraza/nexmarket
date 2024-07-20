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

  isLoading?: boolean;
}

// Define a type for the slice state
interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isLoading?: boolean;
}

// Define the initial state using that type
const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isLoading: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;

      state.totalItems = state.items.reduce(
        (acc, item) => acc + item.quantity,
        0
      );

      state.totalPrice = state.items.reduce((acc, item) => {
        return acc + item.quantity * item.product.price;
      }, 0);
    },
    updateTotalItems(state) {
      state.totalItems = state.items.reduce(
        (acc, item) => acc + item.quantity,
        0
      );

      state.totalPrice = state.items.reduce((acc, item) => {
        return acc + item.quantity * item.product.price;
      }, 0);

      // // Debugging logs
      // console.log("Updated Total Items:", state.totalItems);
      // console.log("Updated Total Price:", state.totalPrice);
    },

    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setCartItems, updateTotalItems, setIsLoading } =
  cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectTotalItems = (state: { cart: CartState }) =>
  state.cart.totalItems;
export const selectTotalPrice = (state: { cart: CartState }) =>
  state.cart.totalPrice;

export const selectIsLoading = (state: { cart: CartState }) =>
  state.cart.isLoading;

export default cartSlice.reducer;
