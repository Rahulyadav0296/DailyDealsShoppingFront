import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Box, Button as MuiButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DetailsRows from "./DetailsRows/DetailsRows";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: 20,
  maxWidth: 800,
  margin: "50px auto",
  textAlign: "center",
  backgroundColor: "#f9f9f9",
  borderRadius: 8,
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
}));

const Title = styled(Typography)(({ theme }) => ({
  color: "#4caf50",
  fontSize: "2em",
  marginBottom: 20,
}));

const Message = styled(Typography)(({ theme }) => ({
  color: "#555",
  fontSize: "1.2em",
  marginBottom: 30,
}));

const OrderDetails = styled(Box)(({ theme }) => ({
  width: "100%",
  backgroundColor: "#fff",
  padding: 20,
  borderRadius: 8,
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  marginBottom: 20,
}));

const Button = styled(MuiButton)(({ theme }) => ({
  backgroundColor: "#4caf50",
  color: "#fff",
  padding: "15px 30px",
  fontSize: "1em",
  borderRadius: 8,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#45a049",
  },
}));

const ItemContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #ddd",
  padding: "10px 15px",
  backgroundColor: "#fafafa",
  borderRadius: 8,
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "background-color 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    backgroundColor: "#f1f1f1",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
}));

const ItemContainerImg = styled(Box)(({ them }) => ({
  display: "flex",
  alignItems: "center",
  borderBottom: "1px solid #ddd",
  padding: "10px 15px",
  backgroundColor: "#fafafa",
  borderRadius: 8,
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "background-color 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    backgroundColor: "#f1f1f1",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
}));

const ItemImage = styled("img")(({ theme }) => ({
  width: "60px",
  height: "60px",
  objectFit: "cover",
  borderRadius: 8,
  marginRight: "15px",
  border: "1px solid #ddd",
}));

const ItemDetails = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "5px",
}));

const ItemName = styled(Typography)(({ theme }) => ({
  margin: 0,
  fontWeight: "bold",
  fontSize: "1em",
  color: "#333",
}));

const ItemPrice = styled(Typography)(({ theme }) => ({
  margin: 0,
  color: "#888",
  fontSize: "0.9em",
}));

const TotalQuantity = styled(Typography)(({ theme }) => ({
  textAlign: "right",
  fontWeight: "bold",
  fontSize: "1em",
  color: "#333",
  marginTop: "20px",
}));

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();
  return { formattedDate, formattedTime };
};

const OrderConfirmation = () => {
  const cartItemsDetails = useSelector((state) => state.auth.cartItemsDetails);
  console.log(cartItemsDetails);
  console.log(cartItemsDetails.items.quantity);
  const { formattedDate, formattedTime } = formatDate(
    cartItemsDetails.createdAt
  );

  return (
    <Container>
      <CheckCircleOutlineIcon style={{ fontSize: 50, color: "#4caf50" }} />
      <Title variant="h1">Order Confirmed!</Title>
      <Message>
        Thank you for your purchase! Your order has been confirmed and is being
        processed.
      </Message>
      <OrderDetails>
        <DetailsRows label={"Order Number:"} value={cartItemsDetails._id} />
        <DetailsRows label={"Date:"} value={formattedDate} />
        <DetailsRows label={"Time:"} value={formattedTime} />
        <DetailsRows
          label={"Total:"}
          value={`$ ${cartItemsDetails.totalPrice}`}
        />
        <div>
          {cartItemsDetails.items.map((item) => (
            <ItemContainer key={item.product._id}>
              <ItemContainerImg>
                <ItemImage src={item.product.image} alt={item.product.name} />
                <ItemDetails>
                  <ItemName>{item.product.name}</ItemName>
                  <ItemPrice>{`$ ${item.product.price}`}</ItemPrice>
                </ItemDetails>
              </ItemContainerImg>
              <TotalQuantity>{`Total Quantity: ${item.quantity}`}</TotalQuantity>
            </ItemContainer>
          ))}
        </div>
      </OrderDetails>
      <Button>
        <Link to="/products" style={{ color: "white" }}>
          Continue Shopping
        </Link>
      </Button>
    </Container>
  );
};

export default OrderConfirmation;
