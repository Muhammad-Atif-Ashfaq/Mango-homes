import { Card, CardContent, styled } from "@mui/material";
import React from "react";
const CardComp = styled(Card)(({ theme }) => ({
  borderRadius: "10px",
  boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.25)",
  padding: "10px 30px",
  marginBottom: "30px",
  [theme.breakpoints.down("md")]: {
    padding: "10px 10px",
  },
}));
const StyledCard = (props) => {
  return (
    <CardComp>
      <CardContent>{props.children}</CardContent>
    </CardComp>
  );
};

export default StyledCard;
