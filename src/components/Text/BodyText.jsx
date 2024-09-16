import { Typography, useTheme } from "@mui/material";
import React from "react";

const BodyText = ({ children, ...props }) => {
  const theme = useTheme();
  return (
    <Typography
      sx={{
        fontSize: "16pt",
        [theme.breakpoints.down("sm")]: { fontSize: "14pt" },
      }}
      {...props}
    >
      {children}
    </Typography>
  );
};

export default BodyText;
