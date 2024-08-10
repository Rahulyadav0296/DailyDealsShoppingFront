import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UpdateUser from "./UpdateUser/UpdateUser";
import UserEdit from "./UserEdit/UserEdit";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  maxWidth: "600px",
  margin: "30px auto",
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
}));

const Button = styled("button")(({ theme }) => ({
  backgroundColor: "red",
  color: theme.palette.primary.contrastText,
  border: "none",
  borderRadius: "4px",
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-block",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
  "& a": {
    color: "inherit",
    textDecoration: "none",
    display: "block",
  },
}));

function User() {
  const userId = useSelector((state) => state.auth.userId);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [editableUser, setEditableUser] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetch(`https://dailydealsbackend-9.onrender.com/signup/${userId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Response from server is not ok");
          }
          return res.json();
        })
        .then((data) => {
          console.log("User Details are: ", data);
          setUser(data);
        })
        .catch((err) => {
          console.log(err);
          setMessage(err.message); // Corrected typo
        });
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!user) {
    return <Typography>Loading...</Typography>; // Ensure it returns this element
  }

  const handleDelete = () => {
    fetch(`http://localhost:5000/signup/${userId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Response from server is not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("User Details after deletion: ", data);
        navigate("/signin");
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.message); // Corrected typo
      });
  };

  return (
    <Container>
      <UserEdit
        setMessage={setMessage}
        setUser={setUser}
        user={user}
        setEditableUser={setEditableUser}
        editableUser={editableUser}
      />
      <UpdateUser
        editableUser={editableUser}
        user={user.profilePicture}
        onChange={handleChange}
        name="profilePicture"
      />
      <UpdateUser
        editableUser={editableUser}
        user={user.firstName}
        onChange={handleChange}
        name="firstName"
      />
      <UpdateUser
        editableUser={editableUser}
        user={user.lastName}
        onChange={handleChange}
        name="lastName"
      />
      <UpdateUser
        editableUser={editableUser}
        user={user.email}
        onChange={handleChange}
        name="email"
      />
      <UpdateUser
        editableUser={editableUser}
        user={user.contactNumber}
        onChange={handleChange}
        name="contactNumber"
      />
      {message && <Typography color="error">{message}</Typography>}{" "}
      {/* Display error message if any */}
      <Button onClick={handleDelete}>Delete </Button>
    </Container>
  );
}

export default User;
