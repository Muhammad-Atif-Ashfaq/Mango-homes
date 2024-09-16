import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
const title = {
  color: "#000",
  // fontFamily: "Roboto",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "20px",
};
const value_style = {
  color: "#7e7e7e",
  // fontFamily: "Roboto",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "20px",
};
const CustomBox = ({ name, value }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
        },
      }}
    >
      <Typography
        sx={{
          ...title,

          [theme.breakpoints.down("sm")]: {
            fontSize: "18px",
          },
        }}
      >
        {name}
      </Typography>
      <Typography
        sx={{
          ...value_style,
          width: "500px",
          textAlign: "right",
          [theme.breakpoints.down("sm")]: {
            width: "200px",
            textAlign: "center",
            fontSize: "18px",
          },
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

export default CustomBox;
