import { Box, Typography, styled } from "@mui/material";
import React from "react";
const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));
import { styles } from "./styles";
const { text, text2 } = styles;
const CardDataComponent = () => {
  return (
    <StyledBox sx={{ mb: 2 }} key={ind}>
      <Typography style={text}>Condo Name</Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ mr: 0.5, mt: 0.7 }}>Icon</Box>
        <Typography style={text2}>VAlue</Typography>
      </Box>
    </StyledBox>
  );
};

export default CardDataComponent;
