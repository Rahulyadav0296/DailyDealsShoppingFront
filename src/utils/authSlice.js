import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  cartItemsDetails: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  orders: null,
  cartItem: 0,
  message: "",
  token: null,
  products: [],
  allProducts: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
      state.allProducts = action.payload;
    },
    setAllProducts(state, action) {
      state.allProducts = action.payload;
    },
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setCartItemsDetails(state, action) {
      // Ensure that the payload contains the necessary information
      state.cartItemsDetails = {
        items: action.payload.items || [],
        totalQuantity: action.payload.totalQuantity || 0,
        totalPrice: action.payload.totalPrice || 0,
      };
    },
    setOrders(state, action) {
      state.orders = action.payload;
    },
    setCartItem(state, action) {
      state.cartItem = action.payload;
    },
    setMessage(state, action) {
      state.message = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    clearMessage(state) {
      state.message = "";
    },
  },
});

export const {
  setUserId,
  setProducts,
  setAllProducts,
  setCartItemsDetails,
  setOrders,
  setCartItem,
  setMessage,
  clearMessage,
  setToken,
} = authSlice.actions;

export default authSlice.reducer;
