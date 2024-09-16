import { Typography, useTheme } from "@mui/material";
import React from "react";

const HeadingText = ({ children, ...props }) => {
  const theme = useTheme();
  return (
    <Typography
      sx={{
        fontSize: "17pt",
        fontWeight: "bold",
        [theme.breakpoints.down("sm")]: {
          fontSize: "15pt",
        },
      }}
      {...props}
    >
      {children}
    </Typography>
  );
};

export default HeadingText;
