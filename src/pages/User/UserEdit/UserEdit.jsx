import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React from "react";
import { useSelector } from "react-redux";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  marginBottom: "20px",
  padding: "10px",
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
}));

const EditButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#ff9800",
  color: "#fff",
  borderRadius: "50%",
  minWidth: "40px",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    backgroundColor: "#fb8c00",
  },
}));

const SaveButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#4caf50",
  color: "#fff",
  padding: "10px 20px",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: "#388e3c",
  },
}));

function UserEdit({ setUser, user, setEditableUser, editableUser }) {
  const userId = useSelector((state) => state.auth.userId);

  const handleSave = async () => {
    try {
      const response = await fetch(
        `https://dailydealsbackend-26.onrender.com/signup/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      const data = await response.json();
      console.log(data);
      setUser(data);
      setEditableUser(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Typography variant="h6">Personal Information</Typography>
      {editableUser ? (
        <EditButton onClick={() => setEditableUser(false)}>
          <EditIcon />
        </EditButton>
      ) : (
        <SaveButton onClick={handleSave}>Save</SaveButton>
      )}
    </Container>
  );
}

export default UserEdit;
