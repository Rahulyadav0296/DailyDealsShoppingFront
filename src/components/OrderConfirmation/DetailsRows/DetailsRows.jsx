import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

const DetailRow = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 0",
  borderBottom: "1px solid #eee",
}));

const DetailLabel = styled(Typography)(() => ({
  color: "#333",
  fontWeight: "bold",
}));

const DetailValue = styled(Typography)(() => ({
  color: "#555",
}));

function DetailsRows({ label, value }) {
  return (
    <DetailRow>
      <DetailLabel>{label}</DetailLabel>
      <DetailValue>{value}</DetailValue>
    </DetailRow>
  );
}

export default DetailsRows;
