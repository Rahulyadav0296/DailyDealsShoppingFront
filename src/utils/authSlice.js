import { createSlice } from "@reduxjs/toolkit";

// const [products, setProducts] = useState([]);
const initialState = {
  userId: null,
  cartItemsDetails: null,
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
  setProducts,
  setAllProducts,
  setCartItemsDetails,
  setCartItem,
  setMessage,
  clearMessage,
  setToken,
} = authSlice.actions;

export default authSlice.reducer;
