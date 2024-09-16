import { Grid, TextField, Typography, styled, useTheme } from "@mui/material";
import React from "react";

const Custom_Fields = ({ title, value }) => {
  const theme = useTheme();
  const StyledInput = styled("input")(({ theme }) => ({
    border: "none",
    fontWeight: 600,
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    width: "100%",
    marginTop: "10px",
    outline: "none",
    fontFamily: "Arial",
    fontSize: "16px",
    color: "grey",
    [theme.breakpoints.down("sm")]: {
      fontSize: "18px",
    },
  }));
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Typography sx={{ fontSize: "16px", mb: -0.5 }}>{title}</Typography>
      <StyledInput type="text" readOnly value={value} />
    </Grid>
  );
};

export default Custom_Fields;
