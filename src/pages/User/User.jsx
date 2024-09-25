import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useFetch from "../../components/Hooks/useFetch";
import UpdateUser from "./UpdateUser/UpdateUser";
import UserEdit from "./UserEdit/UserEdit";

const Container = styled(Box)(() => ({
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

function User() {
  const userId = useSelector((state) => state.auth.userId);
  const [editableUser, setEditableUser] = useState(true);
  const [user, setUser] = useState(null);
  const { results, message } = useFetch({
    url: "http://localhost:5000/users",
    id: userId,
  });

  useEffect(() => {
    setUser(results);
  }, [results]);

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

  return (
    <Container>
      <UserEdit
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
    </Container>
  );
}

export default User;
