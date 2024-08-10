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
  padding: theme.spacing(2), // Adjusted for mobile
  maxWidth: "100%", // Ensure full width
  margin: "20px auto", // Reduced margin for mobile
  textAlign: "center",
  backgroundColor: "#f9f9f9",
  borderRadius: 8,
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  [theme.breakpoints.up("sm")]: {
    maxWidth: 800,
    margin: "50px auto",
    padding: theme.spacing(4),
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  color: "#4caf50",
  fontSize: "1.5em", // Adjusted for mobile
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    fontSize: "2em",
  },
}));

const Message = styled(Typography)(({ theme }) => ({
  color: "#555",
  fontSize: "1em", // Adjusted for mobile
  marginBottom: theme.spacing(3),
  [theme.breakpoints.up("sm")]: {
    fontSize: "1.2em",
  },
}));

const OrderDetails = styled(Box)(({ theme }) => ({
  width: "100%",
  backgroundColor: "#fff",
  padding: theme.spacing(2), // Adjusted for mobile
  borderRadius: 8,
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(3),
  },
}));

const Button = styled(MuiButton)(({ theme }) => ({
  backgroundColor: "#4caf50",
  color: "#fff",
  padding: "10px 20px", // Adjusted for mobile
  fontSize: "1em",
  borderRadius: 8,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#45a049",
  },
  [theme.breakpoints.up("sm")]: {
    padding: "15px 30px",
    fontSize: "1em",
  },
}));

const ItemContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column", // Stack items on mobile
  borderBottom: "1px solid #ddd",
  padding: theme.spacing(1),
  backgroundColor: "#fafafa",
  borderRadius: 8,
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "background-color 0.3s ease, box-shadow 0.3s ease",
  marginBottom: theme.spacing(1),
  "&:hover": {
    backgroundColor: "#f1f1f1",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row", // Align items horizontally on larger screens
  },
}));

const ItemImage = styled("img")(({ theme }) => ({
  width: "60px",
  height: "60px",
  objectFit: "cover",
  borderRadius: 8,
  marginRight: theme.spacing(2),
  border: "1px solid #ddd",
}));

const ItemDetails = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(1),
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
  marginTop: theme.spacing(2),
}));

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();
  return { formattedDate, formattedTime };
};

const OrderConfirmation = () => {
  const cartItemsDetails = useSelector((state) => state.auth.cartItemsDetails);
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
          value={`$ ${cartItemsDetails.totalPrice.toFixed(2)}`} // Fixed to 2 decimal places
        />
        <div>
          {cartItemsDetails.items.map((item) => (
            <ItemContainer key={item.product._id}>
              <ItemImage src={item.product.image} alt={item.product.name} />
              <ItemDetails>
                <ItemName>{item.product.name}</ItemName>
                <ItemPrice>{`$ ${item.product.price.toFixed(2)}`}</ItemPrice>{" "}
                {/* Fixed to 2 decimal places */}
              </ItemDetails>
              <TotalQuantity>{`Total Quantity: ${item.quantity.toFixed(
                2
              )}`}</TotalQuantity>{" "}
              {/* Fixed to 2 decimal places */}
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
