import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [cartItem, setCartItem] = useState(0);
  const [cartItemsDetails, setCartItemsDetails] = useState(null);
  const [message, setMessage] = useState("");

  return (
    <AuthContext.Provider
      value={{
        cartItem,
        setCartItem,
        token,
        setToken,
        userId,
        setUserId,
        cartItemsDetails,
        setCartItemsDetails,
        message,
        setMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
