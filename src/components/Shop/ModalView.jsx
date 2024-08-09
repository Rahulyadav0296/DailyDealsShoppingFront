import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Modal, styled, Typography } from "@mui/material";
import React from "react";

const StyledBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "10%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "#fff",
  border: "2px solid #000",
  boxShadow: 24,
  padding: theme.spacing(2),
  borderRadius: "10px",
  textAlign: "center",
}));

function ModalView({ message, open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title">
      <StyledBox>
        <Typography id="modal-modal-title" variant="h6">
          <CheckCircleIcon style={{ color: "green", marginRight: "8px" }} />
          {message}
        </Typography>
      </StyledBox>
    </Modal>
  );
}

export default ModalView;
