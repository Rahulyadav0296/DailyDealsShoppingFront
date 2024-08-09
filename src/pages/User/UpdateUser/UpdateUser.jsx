import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  marginBottom: "20px",
}));

const ImageWrapper = styled(Box)(({ theme }) => ({
  marginBottom: "20px",
  display: "flex",
  justifyContent: "center",
  width: "100%",
}));

const DetailWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  marginBottom: "10px",
}));

function UpdateUser({ editableUser, user, onChange, name }) {
  return (
    <Container>
      {name === "profilePicture" && (
        <ImageWrapper>
          <img
            src={user}
            alt="User profile"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "100%",
            }}
          />
        </ImageWrapper>
      )}
      {name !== "profilePicture" && (
        <DetailWrapper>
          <Typography variant="body1" component="label" htmlFor={name}>
            {name}:
          </Typography>
          {editableUser ? (
            <Typography variant="body2">{user}</Typography>
          ) : (
            <TextField
              variant="outlined"
              value={user}
              onChange={onChange}
              name={name}
              fullWidth
            />
          )}
        </DetailWrapper>
      )}
    </Container>
  );
}

export default UpdateUser;
