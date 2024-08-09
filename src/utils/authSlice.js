import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  cartItemsDetails: null,
  cartItem: 0,
  message: "",
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setCartItemsDetails(state, action) {
      state.cartItemsDetails = action.payload;
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
  setCartItemsDetails,
  setCartItem,
  setMessage,
  clearMessage,
  setToken,
} = authSlice.actions;

export default authSlice.reducer;
